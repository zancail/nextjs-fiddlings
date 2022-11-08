import Layout from "@components/layout";
import { useSession, getSession } from "next-auth/react";

const Dashboard = () => {
    return (
        <Layout>
            <h1>Dashboard</h1>
        </Layout>
    );
};

export default Dashboard;
