import {
  getAllMenuItemsForHome,
  getPaginatedMenuSummaries,
  getTotalMenuItemsNumber,
} from '@lib/api'
import { Config } from '@lib/config'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Layout from '@components/layout'

import { MenuItemList } from '@components/MenuItemList'

const MenuIndexPage = ({ menuSummaries, totalPages, currentPage }) => {
  return (
    <Layout>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">the Next.js restaurant!</a>
      </h1>
      {menuSummaries && menuSummaries.length ? (
        <MenuItemList
          items={menuSummaries}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      ) : (
        <p>No menu items found</p>
      )}
    </Layout>
  )
}

export const getStaticPaths = async ({ preview = false }) => {
  const totalMenuItems = await getTotalMenuItemsNumber()
  const totalPages = Math.ceil(totalMenuItems / Config.pagination.pageSize)

  const paths = []

  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const menuSummaries = (await getPaginatedMenuSummaries(params.page)) ?? []
  const totalPages = Math.ceil(menuSummaries.total / Config.pagination.pageSize)
  return {
    props: {
      menuSummaries: menuSummaries.items,
      totalPages,
      currentPage: params.page,
    },
  }
}

export default MenuIndexPage
