import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
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
    return <Link href={"/auth/signin"}>Sign in</Link>;
};
