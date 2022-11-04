import Layout from "@components/layout";
import { getAllMenuItemsIds, getMenuItemById } from "@lib/api";

const MenuPage = ({ preview, menuItem }) => {
    return (
        <Layout>
            <h1>{menuItem.title}</h1>
        </Layout>
    );
};

export const getStaticPaths = async () => {
    const menuItemsIds = await getAllMenuItemsIds();

    const paths = menuItemsIds.map((id) => {
        return { params: { id } };
    });

    // Using fallback: "blocking" here enables preview mode for unpublished blog slugs
    // on production
    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps = async ({ params, preview = false }) => {
    const menuItem = await getMenuItemById(params.id, {
        preview: preview,
    });

    // Add this with fallback: "blocking"
    // So that if we do not have a post on production,
    // the 404 is served
    if (!menuItem) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            preview,
            menuItem,
        },
    };
};

export default MenuPage;
