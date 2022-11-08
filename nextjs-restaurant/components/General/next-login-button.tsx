import { signIn, signOut, useSession } from "next-auth/react";

export const LoginButton = (): JSX.Element => {
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
                {session.user.name}
                <button type="button" onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        );
    }
    return (
        <button type="button" onClick={() => signIn()}>
            Sign in
        </button>
    );
};
