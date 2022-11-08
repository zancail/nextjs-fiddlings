import Link from "next/link";

interface Props {
    totalPages: number;
    currentPage: string;
    prevDisabled: boolean;
    nextDisabled: boolean;
}

const Pagination = ({
    totalPages,
    currentPage,
    prevDisabled,
    nextDisabled,
}: Props): JSX.Element => {
    if (totalPages < 2) {
        return <></>;
    }
    const prevPageUrl =
        currentPage === "2"
            ? "/menu"
            : `/menu/page/${parseInt(currentPage, 10) - 1}`;

    const nextPageUrl = `/menu/page/${parseInt(currentPage, 10) + 1}`;

    const listItems = [];

    const listItem = (index) => {
        return (
            <li className="page-item">
                {index !== parseInt(currentPage) ? (
                    <Link
                        href={index === 1 ? "/menu" : `/menu/page/${index}`}
                        className="page-link"
                    >
                        {index}
                    </Link>
                ) : (
                    <span className="page-link active">{index}</span>
                )}
            </li>
        );
    };

    for (let index = 1; index <= totalPages; index++) {
        listItems.push(listItem(index));
    }

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        Page {currentPage} of {totalPages}
                    </li>
                </ul>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        {prevDisabled && (
                            <span className="page-link">Previous</span>
                        )}
                        {!prevDisabled && (
                            <Link href={prevPageUrl} className="page-link">
                                Previous
                            </Link>
                        )}
                    </li>
                    {listItems.map((listItem) => listItem)}
                    <li className="page-item">
                        {nextDisabled && (
                            <span className="page-link">Next</span>
                        )}
                        {!nextDisabled && (
                            <Link href={nextPageUrl} className="page-link">
                                Next
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
