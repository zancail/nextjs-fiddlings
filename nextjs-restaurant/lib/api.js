import { Config } from './config'

const POST_GRAPHQL_FIELDS = `
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
`

const fetchGraphQL = async (query, preview = false) => {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => {
    return response.json()
  })
}

const extractMenuItemEntries = (fetchResponse) => {
  return fetchResponse?.data?.menuItemCollection?.items
}

export const getAllMenuItemsForHome = async (preview) => {
  const entries = await fetchGraphQL(
    `query {
        menuItemCollection(preview: ${preview ? 'true' : 'false'}) {
            items {
                ${POST_GRAPHQL_FIELDS}
            }
        }
      }`,
    preview
  )
  return extractMenuItemEntries(entries)
}

export const getTotalMenuItemsNumber = async () => {
  // Build the query
  const query = `
  query {
    menuItemCollection {
      total
    }
  }
`

  // Call out to the API
  const response = await fetchGraphQL(query)
  const totalMenuItems = response?.data?.menuItemCollection?.total
    ? response.data.menuItemCollection.total
    : 0

  return totalMenuItems
}

export const getPaginatedMenuSummaries = async (page) => {
  const skipMultiplier = page === 1 ? 0 : page - 1
  const skip =
    skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0

  const query = `
  query {
    menuItemCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}) {
        total
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`

  // Call out to the API
  const response = await fetchGraphQL(query)

  const paginatedPostSummaries = response?.data?.menuItemCollection
    ? response.data.menuItemCollection
    : { total: 0, items: [] }

  return paginatedPostSummaries
}
