import { shopify_call } from "shopify-call";
import config from "../../config/config.js";
import { getAccessToken } from "../../utils/common.js";
import {
    METAFIELD_GRAPHQL_QUERY,
    SET_METAFIELD_GRAPHQL_QUERY,
} from "../../graphqlQuery/query.js";

export const createShopMetafield = async (shop, token) => {
    try {
        const mutationPayload = {
            query: METAFIELD_GRAPHQL_QUERY,
            variables: {
                definition:
                {
                    name: "Store Lock",
                    namespace: "store_lock",
                    key: "settings",
                    type: "json",
                    ownerType: "SHOP"
                },
            },
        };
        const response = await shopify_call(
            token,
            shop,
            `${config.SHOPIFY_API_VERSION}/graphql.json`,
            mutationPayload,
            "POST"
        );
        return response.response.data || null;
    } catch (error) {
        console.log(error, 'Error in createShopMetafield')
    }
};

const createOrUpdateSettingController = async (req, res) => {
    const shop = req.query.shop;
    const { settings } = req.body;

    try {
        const session = await getAccessToken(shop);
        const access_token = session?.token;

        const shopId = session?.shopify_store_id
        if (!shopId) {
            return res.status(400).json({
                success: false,
                message: "Shop ID not found",
            });
        }
        const mutationPayload = {
            query: SET_METAFIELD_GRAPHQL_QUERY,
            variables: {
                metafields: [
                    {
                        namespace: "store_lock",
                        key: "settings",
                        ownerId: `gid://shopify/Shop/${shopId}`,
                        type: "json",
                        value: JSON.stringify(settings),
                    },
                ],
            },
        };

        const response = await shopify_call(
            access_token,
            shop,
            `${config.SHOPIFY_API_VERSION}/graphql.json`,
            mutationPayload,
            "POST"
        );
        const metafieldValue = response?.response?.data?.metafieldsSet?.metafields?.[0]?.value || null;
        res.json({
            success: true,
            message: "Setting updated successfully",
            data: JSON.parse(metafieldValue),
        });
    } catch (error) {
        console.error("Error in createOrUpdateSettingController:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create or update metafield",
            error: error.message,
        });
    }
};

export default createOrUpdateSettingController;