import { Link } from "react-router-dom";
import { google } from "../assets";
import InputBox from "../components/input.component";
import AnimationWrapper from "../common/animation-page";
import { useRef } from "react";
import axios, { AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { storeSesion } from "../common/session";
import { UseUserAuthContext } from "../Hooks/UserContext";
import { Navigate } from "react-router-dom";
type UserAuthformProp = {
  types: string;
};
type userAuthThoughServerProp = {
  ServerRoute: string;
  FormData: { [key: string]: string };
};

const UserAuthform = ({ types }: UserAuthformProp) => {
  const { userAuth, setuserAuth } = UseUserAuthContext();

  console.log(userAuth.AccessToken);

  const UserIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 input-icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
  const EmailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 input-icon"
    >
      <path
        strokeLinecap="round"
        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
      />
    </svg>
  );
  const passwordIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 input-icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
      />
    </svg>
  );

  const userAuthThoughServer = async ({
    ServerRoute,
    FormData,
  }: userAuthThoughServerProp) => {
    try {
      const response: AxiosResponse = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + `${ServerRoute}`,
        FormData,
      );
      toast.success("You have successfully logged in");

      // Handle the response data
      console.log("response for this request");
      console.log(response.data);
      storeSesion({ key: "user", value: JSON.stringify(response.data) });
      setuserAuth(response.data);
    } catch (error) {
      //REVIEW: Handle errors
      if (axios.isAxiosError(error)) {
        //REVIEW: Axios error (e.g., network error, status code not in the 2xx range)
        console.error("Axios Error:", error);
        toast.error(error.response?.data.toString());
      } else {
        // REVIEW: Non-Axios error
        const nonAxiosError = error as Error;

        console.error("Non-Axios Error:", nonAxiosError);

        toast.error(nonAxiosError.message.toString());
      }
    }
  };

  const authFormRef = useRef<HTMLFormElement | null>(null);
  const HandeleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    // eslint-disable-next-line prefer-const
    let serverRoute = types === "sign-in" ? "/sign-in" : "/sign-up";
    // eslint-disable-next-line prefer-const
    let form = new FormData(authFormRef.current!);
    // eslint-disable-next-line prefer-const
    let formData: { [key: string]: string } = {};

    for (const [key, value] of form.entries()) {
      formData[key] = value.toString(); // BUG: Ensure value is a string
    }
    // console.log(formData);
    // enqueueSnackbar('Book Deleted successfully', { variant: 'success' });

    userAuthThoughServer({
      ServerRoute: serverRoute,
      FormData: formData,
    });
  };
  return userAuth.AccessToken ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={types}>
      <section className=" h-cover flex w-full items-center justify-center flex-col">
        <Toaster />

        <form
          ref={authFormRef}
          className=" w-[80%] max-w-[400px] flex flex-col gap-6 justify-center items-center"
        >
          <h1 className=" font-bold  font-gelasio capitalize text-4xl mb-14   ">
            {types === "sign-in" ? "Welcome Back" : "Join Us Today"}{" "}
          </h1>
          {types !== "sign-in" ? (
            <InputBox
              name="name"
              type="text"
              value=""
              id="fname"
              child={UserIcon}
              placeholder="Full name"
            />
          ) : (
            ""
          )}

          <InputBox
            name="email"
            type="email"
            value=""
            id="email"
            child={EmailIcon}
            placeholder="Email"
          />
          <InputBox
            name="password"
            type="password"
            value=""
            id="password"
            child={passwordIcon}
            placeholder="Password"
          />

          <button onClick={HandeleSubmit} className="btn-dark w-fit flex ">
            {types.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center my-5 opacity-10 uppercase text-black gap-2 font-bold ">
            <hr className=" w-1/2 bg-black" />
            <p>or</p>
            <hr className=" w-1/2 bg-black" />
          </div>

          <button className="flex items-center justify-center gap-4 w-[90%] center btn-dark">
            <img src={google} className="w-5" alt="" />
            Continue with Google
          </button>
          {types !== "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?{" "}
              <span className=" underline  text-black">
                <Link to={"/signin"}>Sign In</Link>
              </span>{" "}
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have a account ?{" "}
              <span className=" underline  text-black">
                <Link to={"/signin"}>Sign Up</Link>
              </span>{" "}
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthform;
