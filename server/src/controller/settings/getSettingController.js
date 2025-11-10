import { shopify_call } from "shopify-call";
import config from "../../config/config.js";
import { getAccessToken } from "../../utils/common.js";
import { GET_METAFIELD_GRAPHQL_QUERY } from "../../graphqlQuery/query.js";

const getSettingController = async (req, res) => {
    const shop = req.query.shop;

    try {
        const session = await getAccessToken(shop);

        const payload = { query: GET_METAFIELD_GRAPHQL_QUERY };

        const responseMetafield = await shopify_call(
            session?.token,
            shop,
            `${config.SHOPIFY_API_VERSION}/graphql.json`,
            payload,
            "POST"
        );

        const metafieldValue =
            responseMetafield?.response?.data?.shop?.metafield?.value || null;

        if (!metafieldValue) {
            return res.json({ success: true, data: null, message: "No metafield found" });
        }

        res.json({
            success: true,
            data: JSON.parse(metafieldValue),
        });
    } catch (error) {
        console.error("Error in getSettingController:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch metafield data",
            error: error.message,
        });
    }
};

export default getSettingController;