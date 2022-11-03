import { getAllMenuItemsForHome } from '../lib/api'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Layout from '../components/layout'

const Home = ({ allMenuItems }) => {
  return (
    <Layout>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">the Next.js restaurant!</a>
      </h1>
      {allMenuItems && (
        <ul>
          {allMenuItems.map((menuItem) => {
            return (
              <li key={menuItem.sys.id}>
                <h2>{menuItem.title}</h2>({menuItem.category})
                {menuItem.image && <img width="400" src={menuItem.image.url} />}
                {menuItem.price}
                {menuItem.currency}
                {menuItem.dietary}
                <div>
                  {documentToReactComponents(menuItem.description.json)}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </Layout>
  )
}

export const getStaticProps = async ({ preview = false }) => {
  let allMenuItems = (await getAllMenuItemsForHome(preview)) ?? []
  return {
    props: { preview, allMenuItems },
  }
}

export default Home
