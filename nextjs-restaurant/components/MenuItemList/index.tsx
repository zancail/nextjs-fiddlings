import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Pagination from "./Pagination";

export const MenuItemList = ({ items, currentPage, totalPages }) => {
    const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
    const prevDisabled = parseInt(currentPage, 10) === 1;

    return (
        <>
            <ul>
                {items.map((menuItem) => {
                    return (
                        <li key={menuItem.sys.id}>
                            <h2>{menuItem.title}</h2>({menuItem.category})
                            {menuItem.image && (
                                <img width="400" src={menuItem.image.url} />
                            )}
                            {menuItem.price}
                            {menuItem.currency}
                            {menuItem.dietary}
                            <div>
                                {documentToReactComponents(
                                    menuItem.description.json,
                                )}
                            </div>
                            <Link href={`menu/${menuItem.sys.id}`}>View</Link>
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
