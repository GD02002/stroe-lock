import { clientStoresSchema } from "../database/clientStores.js";

export const getAccessToken = async (shop) => {
    const session = await clientStoresSchema.findOne(
        { store_name: shop },
        { token: 1, shopify_store_id: 1, _id: 0 }
    );
    return session || null;
};
