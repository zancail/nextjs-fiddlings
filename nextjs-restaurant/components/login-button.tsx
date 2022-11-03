import { signIn, signOut, useSession } from 'next-auth/react'

export const LoginButton = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email}
        <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  )
}
