import { Link } from "react-router-dom";
import { GetTheDate } from "../common/date";
import type { TrendyBlog } from "../pages/Home.page";
/**
 * Renders a minimal blog component.
 *
 * @param {Object} props - The component props.
 * @param {TrendsBlogDocument} props.blog - The blog document.
 * @param {number} props.index - The index of the blog.
 * @return {JSX.Element} The rendered minimal blog component.
 */

const Minimalblog: React.FC<{ blog: TrendyBlog; index: number }> = (props: {
  blog: TrendyBlog;
  index: number;
}): JSX.Element => {
  const { blog, index } = props;
  const authorName = blog.author.name as string;
  const profile = blog.author.profile as string;
  const blogTitle = blog.title;
  const blogCreatedDate = GetTheDate(blog.createdAt);

  return (
    <Link to={"/"} className="flex gap-5 mb-5 ">
      <div className="flex justify-center items-center w">
        <h1 className="blog-index">
          {index < 10 ? `0${index + 1}` : index + 1}
        </h1>
      </div>
      <div>
        <div className="flex flex-row gap-2 items-center mb-5">
        <Link to={`/author/${authorName}`} className="flex flex-row gap-2 items-center mb-5">
          <img
            src={profile}
            className="w-6 h-6 rounded-full"
            alt={authorName}
          />
          <p className="line-clamp-1">
            {authorName} @{authorName}
          </p>
          </Link>
          <p className="min-w-fit">{blogCreatedDate}</p>
        </div>
        <h1 className="blog-title">{blogTitle}</h1>
      </div>
    </Link>
  );
};

export default Minimalblog;
