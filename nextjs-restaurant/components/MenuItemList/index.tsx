import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Pagination from "./Pagination";
import styles from "./menulist.module.scss";

export const MenuItemList = ({ items, currentPage, totalPages }) => {
    const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
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
        </>
    );
};
