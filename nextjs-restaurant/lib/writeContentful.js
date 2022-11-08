import { createClient } from "contentful-management";

export const submitForm = async (fields, contentType) => {
    const query = {};
    Object.keys(fields).map((inputName) => {
        query[inputName] = { "en-US": fields[inputName] };
    });

    const response = await createNewItem(query, { contentType: contentType });

    return response;
};

export const createNewItem = async (query, variables = {}) => {
    const client = createClient({
        accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    });
    return client
        .getSpace(process.env.CONTENTFUL_SPACE_ID)
        .then((space) =>
            space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID),
        )
        .then((environment) =>
            environment.createEntry(variables.contentType, {
                fields: query,
            }),
        )
        .then((entry) => entry)
        .catch(console.error);
};
