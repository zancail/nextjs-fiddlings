import ContentfulImage from "./contentful-image";
import Link from "next/link";
import cn from "classnames";

type Props = {
    title: string;
    url: string;
    slug?: string;
};

const CoverImage = ({ title, url, slug }: Props) => {
    const image = (
        <ContentfulImage
            width={2000}
            height={1000}
            alt={`Cover Image for ${title}`}
            className={cn("shadow-small", {
                "hover:shadow-medium transition-shadow duration-200": slug,
            })}
            src={url}
        />
    );

    return (
        <div className="sm:mx-0">
            {slug ? (
                <Link href={`/posts/${slug}`}>
                    <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </div>
    );
};

export default CoverImage;
