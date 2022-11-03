import Layout from '../components/layout'
import Link from 'next/link'

const Home = () => {
  return (
    <Layout>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">the Next.js restaurant!</a>
      </h1>

      <Link href={'menu'}>View menu</Link>
    </Layout>
  )
}

export default Home
