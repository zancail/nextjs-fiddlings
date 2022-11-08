import Layout from "@components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getAllMenuItemsIds, getMenuItemById } from "@lib/api";
import { useSession, getSession } from "next-auth/react";

const MenuPage = ({ preview, menuItem }) => {
    const { data: session, status } = useSession();

    const premiumContent = () => {
        if (status === "loading") {
            return <p>Loading...</p>;
        }

        if (status === "unauthenticated") {
            return <p>Access Denied. You need an account to view this.</p>;
        }

        return (
            <>
                <p>You paid $8 to see this, lol.</p>
            </>
        );
    };
    return (
        <Layout>
            <h1>{menuItem.title}</h1>
            {menuItem.dietary}
            <div>{documentToReactComponents(menuItem.description.json)}</div>
            <h2>Premium Menu Content</h2>
            {premiumContent()}
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
