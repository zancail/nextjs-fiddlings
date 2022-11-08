import Link from "next/link";
import Pagination from "./Pagination";

interface MenuItemType {
    sys: {
        id: string;
    };
    title: string;
    category: string;
    image: {
        url: string;
    };
    price: number;
    currency: string;
}
interface Props {
    items: MenuItemType[];
    currentPage: string;
    totalPages: number;
}

export const MenuItemList = ({
    items,
    currentPage,
    totalPages,
}: Props): JSX.Element => {
    const nextDisabled = parseInt(currentPage, 10) === totalPages;
    const prevDisabled = parseInt(currentPage, 10) === 1;

    return (
        <>
            <ul className="menuList">
                {items.map((menuItem) => {
                    return (
                        <li key={menuItem.sys.id}>
                            <div>
                                <h2>{menuItem.title}</h2>({menuItem.category})
                                {menuItem.image && (
                                    <img width="400" src={menuItem.image.url} />
                                )}
                                {menuItem.price}
                                {menuItem.currency}
                            </div>
                            <Link href={`menu/${menuItem.sys.id}`}>View</Link>
                            <hr />
                        </li>
                    );
                })}
            </ul>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                nextDisabled={nextDisabled}
                prevDisabled={prevDisabled}
            />
            <style jsx>{`
                .menuList {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
            `}</style>
        </>
    );
};
