import config from '../config/config.js';
import '@shopify/shopify-api/adapters/node';
import {shopifyApi, LATEST_API_VERSION} from '@shopify/shopify-api';
import {handleSuccess,handleError} from '../helper/response_handler.js';
import {clientStoresSchema} from "../database/clientStores.js";
import {
    getShopDataQuery,
    getThemeDataQuery,
    webhoookSubscritionCreate,
} from "../helper/graphql_query_template.js";
import {shopify_call} from 'shopify-call';
import common from "common-utils";
import {v4 as uuidv4} from "uuid";
import {unescapeHTML} from "../helper/db_functions.js";
import { createShopMetafield } from './settings/createSettingController.js';

const shopifyAuth = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SCOPES.split(','),
    hostName: process.env.HOST.replace(/https:\/\//, ''),
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
});


const firtShopify = async (req, res) => {
    const {status_code_config: statusCode, en_message_config: en} = config;
    const shop = req.query?.shop;
    const host = req.query?.host;
    try {
        if (shop) {
            let shopdData = await clientStoresSchema.findOne({ store_name: shop,  status: '1'} ,{ store_name : 1,shop_plan:1, charge_app : 1,trial_days: 1 , token : 1 });
            if (!shopdData) {
                await shopifyAuth.auth.begin({
                    shop: req.query.shop,
                    callbackPath: '/api/auth/callback',
                    isOnline: false,
                    rawRequest: req,
                    rawResponse: res,
                });
            } else {
                const redirectUrl = `${config.editor_url}?shop=${shop}&host=${host}`;
                res.redirect(redirectUrl);
            }
        } else {
            handleError(statusCode.OK, en.ERROR_SOMETHING_WRONG, res);
        }
    } catch (err) {
        console.log(err, 'error');
        handleError(statusCode.OK, en.ERROR_SOMETHING_WRONG, res);
    }
}


const shopifyCallbackFn = async (req, res) => {
    let {status_code_config: statusCode, en_message_config: en} = config;
    try {
        const {session} = await shopifyAuth.auth.callback({
            rawRequest: req,
            rawResponse: res
        });
        let host = req?.query?.host;
        if (session?.shop && session.scope) {
            let shop = session?.shop;
            const {SHOPIFY_API_KEY, HOST, SITE_WEBHOOK_PREFIX} = process.env;
            if (session?.accessToken) {
                const access_token = session.accessToken;
                let shopQuery = {query: getShopDataQuery()}
                let themeQuery = {query: getThemeDataQuery()}
                let [themeDataShopifyCall, shopDataShopifyCall] = await Promise.all([shopify_call(access_token, shop, `${config.SHOPIFY_API_VERSION}/graphql.json`, themeQuery, 'POST'), shopify_call(access_token, shop, `${config.SHOPIFY_API_VERSION}/graphql.json`, shopQuery, 'POST')])
                if (themeDataShopifyCall?.response?.data && shopDataShopifyCall?.response?.data) {
                    let themeId = '';
                    let themeData = themeDataShopifyCall?.response?.data?.themes?.edges;
                    themeData = themeData?.find(themes => themes?.node?.role === 'MAIN');
                    if (themeData?.node?.id) {
                        themeId = themeData?.node?.id?.replace('gid://shopify/OnlineStoreTheme/', '');
                    }
                    let shopData = shopDataShopifyCall?.response?.data?.shop;
                    let date = common.date_format('Y-m-d H:i:s');
                    let shop_data = {
                        store_client_id : uuidv4(),
                        shopify_store_id: shopData?.id?.replace('gid://shopify/Shop/', '') || '',
                        email: shopData?.email || '',
                        app_language: "en",
                        theme_language: shopData?.primaryDomain?.localization?.defaultLocale || '',
                        store_name: shopData?.myshopifyDomain,
                        shop_name: shopData?.name,
                        shop_plan: shopData?.plan?.displayName,
                        shop_owner: shopData?.shopOwnerName,
                        address1: shopData?.billingAddress?.address1,
                        address2: shopData?.billingAddress?.address2,
                        city: shopData?.billingAddress?.city,
                        country_name: shopData?.billingAddress?.country,
                        phone: shopData?.billingAddress?.phone,
                        province: shopData?.billingAddress?.province,
                        zip: shopData?.billingAddress?.zip,
                        timezone: shopData?.timezoneOffset,
                        iana_timezone: shopData?.ianaTimezone,
                        domain: shopData?.primaryDomain?.host,
                    };
                    let updateFields = {
                        install_date : date,
                        status : '1',
                        app_status : '0',
                        token : access_token,
                        store_theme_id : themeId,
                        money_format: unescapeHTML(shopData?.currencyFormats?.moneyFormat),
                        currency: shopData?.currencyCode || '',
                    };
                    let insertData = await clientStoresSchema.updateOne({ store_name: shopData?.myshopifyDomain },
                        {
                            $set: updateFields,
                            $setOnInsert: shop_data,
                        },
                        {
                            upsert : true,
                            new : true
                        });

                    const webhook_array = config.WEBHOOK_ARR;
                    let webhook_array_len = webhook_array.length;
                    let webhook_response = [];
                    while (webhook_array_len--) {
                        let element = webhook_array[webhook_array_len];
                        let path = element.toLowerCase();
                        let payload = {
                            query: webhoookSubscritionCreate(),
                            variables: {
                                topic: element,
                                webhookSubscription: {
                                    callbackUrl: `${HOST}${SITE_WEBHOOK_PREFIX}/${path}`,
                                    format: "JSON",
                                }
                            }
                        }
                        let response = shopify_call(access_token, shop, `${config.SHOPIFY_API_VERSION}/graphql.json`, payload, 'POST');
                        webhook_response.push(response);
                    }
                    let [app_remove_webhook] = await Promise.all(webhook_response);

                    createShopMetafield(shop, access_token)
                    res.redirect(`https://${shop}/admin/apps/${SHOPIFY_API_KEY}?shop=${shop}`);
                    // if (app_remove_webhook.response) {
                    //     res.redirect(`https://${shop}/admin/apps/${SHOPIFY_API_KEY}?shop=${shop}`);
                    // } else {
                    //     res.redirect(`${config.editor_url}?shop=${shop}&host=${host}`);
                    //     // res.send("Hello");
                    // }
                }else{
                    handleError(statusCode.BAD_REQUEST, en.ERROR_SOMETHING_WRONG, res);
                }
            } else {
                console.log("error==============access_token==============>", 'access_token_response')
                handleError(statusCode.BAD_REQUEST, en.ERROR_SOMETHING_WRONG, res);
            }
        } else {
            handleError(statusCode.BAD_REQUEST, en.ERROR_SOMETHING_WRONG, res);
        }
    } catch (error) {
        console.log("error==============catch==============>", error)
        handleError(statusCode.BAD_REQUEST, en.ERROR_SOMETHING_WRONG, res);
    }
}
export {firtShopify,shopifyCallbackFn};


