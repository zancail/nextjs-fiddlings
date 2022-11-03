import { getAllMenuItemsForHome, getPaginatedMenuSummaries } from '@lib/api'
import { Config } from '@lib/config'

import Layout from '@components/layout'
import { MenuItemList } from '@components/MenuItemList'

const MenuIndex = ({
  allMenuItems,
  menuSummaries,
  totalPages,
  currentPage,
}) => {
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

export const getStaticProps = async ({ preview = false }) => {
  let allMenuItems = (await getAllMenuItemsForHome(preview)) ?? []
  const menuSummaries = (await getPaginatedMenuSummaries(1)) ?? []
  const totalPages = Math.ceil(menuSummaries.total / Config.pagination.pageSize)
  return {
    props: {
      preview,
      allMenuItems,
      menuSummaries: menuSummaries.items,
      totalPages,
      currentPage: '1',
    },
  }
}

export default MenuIndex
