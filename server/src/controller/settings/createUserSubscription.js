import config from '../../config/config.js';
import { clientStoresSchema } from '../../database/clientStores.js';
import { appSubscriptionCreate } from '../../helper/graphql_query_template.js';
import { handleError, handleSuccess } from '../../helper/response_handler.js';
import { shopify_call } from 'shopify-call';
import env from 'dotenv';
env.config();

const createUserSubscription = async (req, res) => {
    const { shop } = req.query;
    const { status_code_config: statusCode, en_message_config: en } = config;
    try {
        if (!shop) {
            return handleError(statusCode.BAD_REQUEST, en.SHOP_IS_REQUIRED, res, '', false, false, false);
        }
        const shopdData = await clientStoresSchema.findOne({ store_name: shop, status: '1' }, {
            store_name: 1,
            shop_plan: 1,
            charge_app: 1,
            trial_days: 1,
            token: 1,
            created_on: 1
        });
        let testStore = false;
        let remainingTrialDays = shopdData?.trial_days || 0;
        console.log(remainingTrialDays, 'remainingTrialDays');
        if (process.env.SUBSCRIPTION_MODE === 'TEST') {
            testStore = true;
        }
        const payload = {
            query: appSubscriptionCreate(),
            variables: {
                "name": "Starter Plan",
                "returnUrl": `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}?shop=${shop}`,
                "test": testStore,
                "trialDays": remainingTrialDays,
                "lineItems": [
                    {
                        "plan": {
                            "appRecurringPricingDetails": {
                                "price": {
                                    "amount": 1.9,
                                    "currencyCode": "USD"
                                },
                                "interval": "EVERY_30_DAYS"
                            }
                        }
                    }
                ]
            }
        }
        const appSubscriptionCreateShopifyCall = await shopify_call(shopdData?.token, shopdData?.store_name, `${config.SHOPIFY_API_VERSION}/graphql.json`, payload, 'POST');
        if (appSubscriptionCreateShopifyCall?.status === 200 && appSubscriptionCreateShopifyCall?.response?.data?.appSubscriptionCreate?.userErrors?.length === 0) {
            const confirmationUrl = appSubscriptionCreateShopifyCall?.response?.data?.appSubscriptionCreate?.confirmationUrl;
            return handleSuccess(statusCode.OK, en.SUBSCRIPTION_CREATED, confirmationUrl, res, '', true);
        }
        return handleError(statusCode.BAD_REQUEST, en.SUBSCRIPTION_CREATION_FAILED, res, '', false, false, false);
    } catch (error) {
        console.log(error)
        handleError(statusCode.INTERNAL_SERVER_ERROR, en.INTERNAL_SERVER_ERROR, res, '', false, false, false);
    }
}

export default createUserSubscription;
