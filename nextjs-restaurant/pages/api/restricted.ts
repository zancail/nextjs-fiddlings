import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    res.send({
      content:
        'This is protected content. You can access this because you are signed in.',
    })
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content of this page.',
    })
  }
}
