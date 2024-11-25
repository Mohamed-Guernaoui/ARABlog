import { Link, useNavigate, Outlet } from "react-router-dom";
import { logo } from "../assets";
import { useState } from "react";
import { UseUserAuthContext } from "../Hooks/UserContext";
import Usernavigation from "./User-navigating.component";

const Navbar = () => {
  const [ToggleSearch, setToggleSearch] = useState(false);
  const [UserNavPanel, setUserNavPanel] = useState(false);
  const { userAuth } = UseUserAuthContext();
  const navigate = useNavigate();

  const handelKeyDown = (e: React.KeyboardEvent) => {
    const Query = e.target as HTMLInputElement;

    if (!Query.value) {
      return;
    }

    console.log(Query.value);
    if (e.key === "Enter") {
      navigate(`/search/${Query.value}`);
    }
  };
  return (
    <>
      <nav className="navbar">
        {/*@apply z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white;*/}

        <div className=" flex  items-center gap-5  ml-auto">
          {userAuth.AccessToken ? (
            <>
              <div className="relative">
                <button
                  className="w-12 h-12 mt-1 rounded-full"
                  onClick={() => setUserNavPanel((prev) => !prev)}
                >
                  <img
                    className="rounded-full object-cover w-full h-full"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FiqQVZ9jc1WyZpJXcOa1MQHaE8%26pid%3DApi&f=1&ipt=5fb3dd1d2859b98216cd0142070aea48521de3a29b3e2a2f876e2e328cc76d64&ipo=images"
                    alt=""
                  />
                </button>
                {UserNavPanel && <Usernavigation />}
              </div>
              <Link to="/dashboard">
                <button className=" bg-grey w-12 h-12 hover:bg-black/10 rounded-full flex justify-center items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-2xl block mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                    />
                  </svg>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2 " to={"/signin"}>
                Sign In
              </Link>

              <Link className="btn-light py-2  hidden md:block" to={"/signup"}>
                Sign Up
              </Link>
            </>
          )}
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center "
            onClick={() => {
              setToggleSearch((currentval) => !currentval);
              console.log(ToggleSearch);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <Link to={"/editor"} className=" hidden md:flex gap-3 link ">
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <p>write</p>
          </Link>
        </div>

        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.! border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (ToggleSearch ? "show" : "hide")
          }
        >
          <input
            type="text"
            className="w-full md:w-auto bg-grey p-4 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12 "
            placeholder="search"
            onKeyDown={handelKeyDown}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute left-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <Link className="flex-none  w-11" to={"/"}>
          <img src={logo} alt="" className="w-full " />
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
