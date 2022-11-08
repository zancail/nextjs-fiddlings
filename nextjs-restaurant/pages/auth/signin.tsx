import Layout from "@components/layout";
import { getProviders, signIn } from "next-auth/react";
import FormInput from "@components/Form/Input";

import _JSXStyle from "styled-jsx/style";

const SignIn = ({ providers }) => {
    if (typeof global !== "undefined") {
        Object.assign(global, { _JSXStyle });
    }

    return (
        <Layout>
            <form>
                <FormInput type="email" field="email" />
                <FormInput type="password" field="password" />
                <button type="button">Sign in</button>
            </form>
            <hr />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="loginButton"
                        onClick={() => signIn(provider.id)}
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
            <style jsx>{``}</style>
        </Layout>
    );
};

export const getServerSideProps = async (context) => {
    const providers = await getProviders();
    return {
        props: { providers },
    };
};

export default SignIn;
