export const METAFIELD_GRAPHQL_QUERY = `
mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition {
      id
      name
      namespace
      key
      ownerType
    }
    userErrors {
      field
      message
      code
    }
  }
}`;

export const CreateMetafieldDefinitionVariables = {
    "definition": {
        "name": "Store Lock Settings",
        "namespace": "store_lock",
        "key": "settings",
        "description": "Stores Store Lock protection settings in JSON format.",
        "type": "json",
        "ownerType": "SHOP"
    }
};

export const GET_METAFIELD_GRAPHQL_QUERY = `query {
  shop {
    metafield(namespace: "store_lock", key: "settings") {
      id
      value
    }
  }
}`;

export const SET_METAFIELD_GRAPHQL_QUERY = `
mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields {
      id
      key
      namespace
      value
      createdAt
      updatedAt
    }
    userErrors {
      field
      message
      code
    }
  }
}`;