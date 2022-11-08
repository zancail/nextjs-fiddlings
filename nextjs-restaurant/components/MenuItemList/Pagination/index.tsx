import Link from "next/link";
import styles from "./pagination.module.scss";

const Pagination = ({
    totalPages,
    currentPage,
    prevDisabled,
    nextDisabled,
}) => {
    const prevPageUrl =
        currentPage === "2"
            ? "/menu"
            : `/menu/page/${parseInt(currentPage, 10) - 1}`;

    const nextPageUrl = `/menu/page/${parseInt(currentPage, 10) + 1}`;

    const listItems = [];

    const listItem = (index) => {
        return (
            <li className="paginationItem">
                {index !== parseInt(currentPage) ? (
                    <Link href={index === 1 ? "/menu" : `/menu/page/${index}`}>
                        {index}
                    </Link>
                ) : (
                    index
                )}
            </li>
        );
    };

    for (let index = 1; index <= totalPages; index++) {
        listItems.push(listItem(index));
    }

    return (
        <>
            <ul className="pagination">
                <li className="paginationItem">
                    {prevDisabled && <span>Previous page</span>}
                    {!prevDisabled && (
                        <Link href={prevPageUrl}>
                            <a>Previous page</a>
                        </Link>
                    )}
                </li>
                <li className="paginationItem">
                    Page {currentPage} of {totalPages}
                </li>
                <li className="paginationItem">
                    {nextDisabled && <span>Next page</span>}
                    {!nextDisabled && (
                        <Link href={nextPageUrl}>
                            <a>Next page</a>
                        </Link>
                    )}
                </li>
            </ul>
            <ul className="pagination">
                {listItems.map((listItem) => listItem)}
            </ul>
        </>
    );
};

export default Pagination;
