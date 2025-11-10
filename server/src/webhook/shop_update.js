import config from '../config/config.js';
import {handleError, handleSuccess} from '../helper/response_handler.js';
import {clientStoresSchema} from "../database/clientStores.js";
import {unescapeHTML} from "../helper/db_functions.js";
import {addShopMetafield} from "../helper/graphql_query_template.js";
import {shopify_call} from 'shopify-call';

const updateShopMetafields = async (shop, shopID, shopPlan, moneyFormat) => {
    try {
        // Get store data to get access token
        const storeData = await clientStoresSchema.findOne({store_name: shop}, {token: 1,shopify_store_id:1});
        if (!storeData?.token && !storeData?.shopify_store_id) {
            console.log("No access token found for shop:", shop);
            return;
        }

        // Create a JSON object containing both store plan and money format
        const storeDataObject = {
            store_plan: shopPlan || "Unknown",
            money_format: moneyFormat || "{{amount}}"
        };

        // Define the single metafield to be updated
        const metafields = [
            {
                namespace: "mg_dynamic_price",
                key: "store_data",
                value: JSON.stringify(storeDataObject),
                type: "json",
                ownerId: `gid://shopify/Shop/${storeData?.shopify_store_id}`
            }
        ];

        // Create the GraphQL payload
        const payload = {
            query: addShopMetafield(),
            variables: {
                metafields: metafields
            }
        };

        // Make the API call to update metafield
        const response = await shopify_call(
            storeData.token,
            shop,
            `${config.SHOPIFY_API_VERSION}/graphql.json`,
            payload,
            'POST'
        );

        if (response?.status === 200 && !response?.response?.data?.metafieldsSet?.userErrors?.length) {
            console.log("Metafield updated successfully for shop:", shop);
        } else {
            console.log("Error updating metafield:", response?.response?.data?.metafieldsSet?.userErrors);
        }
    } catch (error) {
        console.log("Error in updateShopMetafields:", error);
    }
};

export const shop_update = async (req, res) => {
    let {status_code_config: statusCode, en_message_config: en} = config;
    try {
        let shop = req.get('x-shopify-shop-domain');
        console.log(shop, 'shop')
        if (shop) {
            let shop_data = req.body;
            console.log(shop_data, 'shop_data')
            let taxes_included = shop_data.taxes_included ? '1' : '0';
            let update_data = {
                email: shop_data.email,
                shopify_store_id: shop_data.id,
                app_language: "en",
                theme_language: shop_data.primary_locale,
                store_name: shop_data.myshopify_domain,
                shop_name: shop_data.name,
                shop_plan: shop_data.plan_display_name,
                money_format: unescapeHTML(shop_data.money_format),
                currency: shop_data.currency,
                shop_owner: shop_data.shop_owner,
                address1: shop_data.address1,
                address2: shop_data.address2,
                city: shop_data.city,
                country_name: shop_data.country_name,
                phone: shop_data.phone,
                province: shop_data.province,
                zip: shop_data.zip,
                timezone: shop_data.timezone,
                iana_timezone: shop_data.iana_timezone,
                domain: shop_data.myshopify_domain,
                is_tax_included: taxes_included,
            };
            await clientStoresSchema.updateOne({store_name: shop}, {$set: update_data});

            // Update metafields in Shopify store
            try {
                await updateShopMetafields(shop, shop_data.id, shop_data?.plan_display_name, unescapeHTML(shop_data.money_format));
            } catch (metafieldError) {
                console.log("Error updating metafields in shop_update webhook:",    metafieldError);
            }

            handleSuccess(statusCode.OK, en.SHOP_UPDATE_WEBHOOK_SUCCESS, '', res);
        } else {
            handleError(statusCode.BAD_REQUEST, en.ERROR_SOMETHING_WRONG, res);
        }
    } catch (error) {
        console.log("error============app_uninstall=============>", error)
        handleError(statusCode.BAD_REQUEST, en.ERROR_SOMETHING_WRONG, res);
    }
};

