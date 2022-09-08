const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
description {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`;

async function fetchGraphQL(query, preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    preview
                        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                        : process.env.CONTENTFUL_ACCESS_TOKEN
                }`,
            },
            body: JSON.stringify({ query }),
        },
    ).then((response) => response.json());
}

function extractPost(fetchResponse) {
    return fetchResponse?.data?.blogPostCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
    return fetchResponse?.data?.blogPostCollection?.items;
}

export async function getPreviewPostBySlug(slug) {
    const entry = await fetchGraphQL(
        `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
        true,
    );
    return extractPost(entry);
}

export async function getAllPostsWithSlug() {
    const entries = await fetchGraphQL(
        `query {
      blogPostCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    );
    return extractPostEntries(entries);
}

export async function getAllPostsForHome(preview) {
    const entries = await fetchGraphQL(
        `query {
      blogPostCollection(limit: 10, order: date_DESC, preview: ${
          preview ? "true" : "false"
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
        preview,
    );
    return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug, preview) {
    const entry = await fetchGraphQL(
        `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: ${
            preview ? "true" : "false"
        }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
        preview,
    );
    const entries = await fetchGraphQL(
        `query {
      blogPostCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
            preview ? "true" : "false"
        }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
        preview,
    );
    return {
        post: extractPost(entry),
        morePosts: extractPostEntries(entries),
    };
}

var contentful = require("contentful");

var client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const fetchMenuItems = async () => {
    // Querying the entries specifying the content type ID
    let entries = await client.getEntries({
        content_type: "menuItem",
    });

    entries = { ...entries.items };

    return entries;
};
