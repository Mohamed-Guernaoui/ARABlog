import { Link } from "react-router-dom";
type Tauthor = {
  name: string;
  profile:string;
};
const AuthorCard: React.FC<{ authors: Tauthor }> = (props: {
  authors: Tauthor;
}): JSX.Element => {
  const { authors } = props;

  return (
    <Link
      to={`/author/${authors.name}`}
      className="flex gap-5 items-center mb-5"
    >
      <img
        src={authors.profile}
        // src="https://avatars.githubusercontent.com/u/90214045?v=4"
        className="w-12 h-12 rounded-full object-cover"
        alt=""
      />
      <div>
        <h1 className="font-medium text-xl line-clamp-2">{authors.name}</h1>
        <p className="text-dark-grey"> @{authors.name}</p>
      </div>
    </Link>
  );
};

export default AuthorCard;
