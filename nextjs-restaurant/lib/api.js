import { authOptions } from "pages/api/auth/[...nextauth]";
import { Config } from "./config";

const defaultOptions = {
    preview: false,
};

const MENUITEM_GRAPHQL_FIELDS = `
    sys {
        id
    }
    title
    image {
        url
    }
    price
    currency
    category
    dietary
    description {
        json
    }
`;

const fetchGraphQL = async (
    query,
    variables = {},
    options = defaultOptions,
) => {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    options.preview
                        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                        : process.env.CONTENTFUL_ACCESS_TOKEN
                }`,
            },
            body: JSON.stringify({ query, variables }),
        },
    ).then((response) => {
        return response.json();
    });
};

const extractMenuItemEntries = (fetchResponse) => {
    return fetchResponse?.data?.menuItemCollection?.items;
};

export const getAllMenuItemsForHome = async (options = defaultOptions) => {
    const entries = await fetchGraphQL(
        `query {
        menuItemCollection(preview: ${options.preview ? "true" : "false"}) {
            items {
                ${MENUITEM_GRAPHQL_FIELDS}
            }
        }
      }`,
    );
    return extractMenuItemEntries(entries);
};

export const getTotalMenuItemsNumber = async () => {
    // Build the query
    const query = `
  query {
    menuItemCollection {
      total
    }
  }
`;

    // Call out to the API
    const response = await fetchGraphQL(query);
    const totalMenuItems = response?.data?.menuItemCollection?.total
        ? response.data.menuItemCollection.total
        : 0;

    return totalMenuItems;
};

export const getPaginatedMenuSummaries = async (page) => {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
        skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `
  query {
    menuItemCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}) {
        total
        items {
          ${MENUITEM_GRAPHQL_FIELDS}
        }
      }
    }`;

    // Call out to the API
    const response = await fetchGraphQL(query);

    const paginatedPostSummaries = response?.data?.menuItemCollection
        ? response.data.menuItemCollection
        : { total: 0, items: [] };

    return paginatedPostSummaries;
};

const getPaginatedIds = async (page) => {
    const queryLimit = 100;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const variables = { limit: queryLimit, skip };

    const query = `query GetPaginatedSlugs($limit: Int!, $skip: Int!) {
    menuItemCollection(limit: $limit, skip: $skip) {
        total
        items {
          sys {
            id
          }
          }
        }
      }`;

    const response = await fetchGraphQL(query, variables);

    let ids = [];

    if (!response?.data?.menuItemCollection) {
        return { ids };
    }
    const { total } = response?.data?.menuItemCollection;
    ids = response.data.menuItemCollection.items
        ? response.data.menuItemCollection.items.map((item) => item.sys.id)
        : [];

    return { ids, total };
};

export const getAllMenuItemsIds = async () => {
    let page = 1;
    let shouldQueryMoreIds = true;
    const returnIds = [];

    while (shouldQueryMoreIds) {
        const response = await getPaginatedIds(page);

        if (response.ids.length > 0) {
            returnIds.push(...response.ids);
        }

        shouldQueryMoreIds = returnIds.length < response.total;
        page++;
    }

    return returnIds;
};

export const getMenuItemById = async (id, options = defaultOptions) => {
    const variables = { id, preview: options.preview };
    const query = `query getMenuItemById($id: String!, $preview: Boolean!) {
    menuItemCollection(limit: 1, where: {sys: {id: $id}}, preview: $preview) {
      total
      items {
        ${MENUITEM_GRAPHQL_FIELDS}
      }
    }
  }`;

    const response = await fetchGraphQL(query, variables);

    const menuItems = extractMenuItemEntries(response);
    if (menuItems && menuItems.length) {
        return menuItems[0];
    }
    return null;
};
