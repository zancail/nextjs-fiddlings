import Layout from "@components/layout";
import { getProviders, signIn } from "next-auth/react";
import type { Provider } from "next-auth/providers";
import FormInput from "@components/Form/Input";

import _JSXStyle from "styled-jsx/style";

interface SignInType {
    providers: Provider[];
}

const SignIn = ({ providers }: SignInType) => {
    if (typeof global !== "undefined") {
        Object.assign(global, { _JSXStyle });
    }

    return (
        <Layout>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form>
                        <FormInput type="email" field="email" label="Email" />
                        <FormInput
                            type="password"
                            field="password"
                            label="Password"
                        />
                        <button className="btn btn-primary" type="button">
                            Sign in
                        </button>
                    </form>
                    <hr />
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button
                                className="btn btn-primary"
                                onClick={() => signIn(provider.id)}
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

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
