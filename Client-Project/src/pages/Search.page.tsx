import axios from "axios";
import { useParams } from "react-router-dom";
import InPageNavigation from "../components/InPageNavigation.component";
import AnimationWrapper from "../common/animation-page";
import Loader from "../components/loader.component";
import BlogCard from "../components/BlogCard.component";
import NoDataMessage from "../components/noDataMessage.component";
import LoadMoreBlogs from "../components/LoadMoreBlogs.component";
import type { TBlog } from "../pages/Home.page";
import { SetStateAction, useEffect, useState } from "react";
import FilterPagination from "../components/fitter_pagination";
import AuthorCard from "../components/AuthorCard.component";
type Tauthor = {
  name: string;
  profile:string;
};
const SeachPage = () => {
  const { query } = useParams();
  const [blog, setblog] = useState<TBlog | null>(null);
  const [Authors, setAuthors] = useState<Tauthor[]>([]);
  console.log(Authors);

  const searching = ({ page = 1, new_Array = false }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + `/search`, { query, page })
      .then(async ({ data }) => {
        const formData = await FilterPagination({
          countRoute: "/search-count-docs",
          data: data,
          state: blog,
          new_Array,
          page,
          date_to_send: { query } as Record<string, string>,
          // Add this line
        });
        setblog(formData as SetStateAction<TBlog | null>);
      });
  };
  const getAuthors = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + `/search-authors`, { query })
      .then(async ({ data }) => {
        setAuthors(data);
      });
  };
  const resetState = () => {
    setblog(null);
  };
  useEffect(() => {
    resetState();
    searching({ page: 1, new_Array: true });
    getAuthors();
  }, [query]);

  const AuthorCardWrapper = () => {
    if (Authors === null) {
      return <Loader />;
    }
    if (Authors.length === 0) {
      return <NoDataMessage message={"No Authors"} />;
    }
    return Authors.map((author, i: number) => {
      return (
        <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
          <AuthorCard authors={author} key={i} />
        </AnimationWrapper>
      );
    });
  };

  return (
    <section className="h-cover flex judtify-center gap-10 ">
      <div className="w-full">
        <InPageNavigation
          defaulthidden={["Accounts Matched"]}
          routes={[`search result for ${query} `, "Accounts Matched"]}
        >
          <>
            {blog === null ? (
              <Loader />
            ) : blog.results.length > 0 ? (
              blog.results.map((blog, i: number) => {
                return (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <BlogCard blog={blog} key={i} />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message={`No Results Found about ${query} `} />
            )}
            <LoadMoreBlogs
              state={blog || { results: [], page: 0, totalDocs: 0 }}
              fetchDataFun={searching}
            />
          </>
          <AuthorCardWrapper />
        </InPageNavigation>
      </div>

      <section className=" min-w-[40%] lg:min-w-[350px%] max-w-min border-r border-grey pr-8 pt-3 max-md:hidden">
        <div className=" flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <h1 className="font-medium text-xl mb-8 ">
            المؤلفون ذو الصلة بالبحث
          </h1>
        </div>

        <AuthorCardWrapper />
      </section>
    </section>
  );
};

export default SeachPage;
