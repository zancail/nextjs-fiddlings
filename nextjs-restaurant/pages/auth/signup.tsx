import Layout from "@components/layout";
import type { Provider } from "next-auth/providers";
import FormInput from "@components/Form/Input";
import { submitForm } from "@lib/writeContentful";

import _JSXStyle from "styled-jsx/style";
import { useState } from "react";

interface SignUpType {
    providers: Provider[];
}

const SignUp = ({ providers }: SignUpType) => {
    if (typeof global !== "undefined") {
        Object.assign(global, { _JSXStyle });
    }

    const [formFields, setFormFields] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleOnChange = (inputValue: string, inputName: string) => {
        setFormFields((prevValue) => {
            const fieldsCopy = { ...prevValue };
            fieldsCopy[inputName] = inputValue;
            return fieldsCopy;
        });
    };

    const handleOnSubmit = async (e, removeKeys) => {
        e.preventDefault();
        const filteredFields = { ...formFields };
        removeKeys.forEach((key) => {
            delete filteredFields[key];
        });
        const response = await submitForm(filteredFields, "user");
        console.log(response);
    };

    return (
        <Layout>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form
                        onSubmit={(e) => {
                            handleOnSubmit(e, ["confirmPassword"]);
                        }}
                    >
                        <FormInput
                            type="username"
                            field="username"
                            label="Username"
                            handleOnChange={handleOnChange}
                        />
                        <FormInput
                            type="email"
                            field="email"
                            label="Email"
                            handleOnChange={handleOnChange}
                        />
                        <FormInput
                            type="password"
                            field="password"
                            label="Password"
                            handleOnChange={handleOnChange}
                        />
                        <FormInput
                            type="password"
                            field="confirmPassword"
                            label="Confirm Password"
                            handleOnChange={handleOnChange}
                        />
                        <button className="btn btn-primary" type="submit">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{``}</style>
        </Layout>
    );
};

export default SignUp;
