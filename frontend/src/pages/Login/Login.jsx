import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { showNotification } from "../../helpers/helpers";
import { useAuthRedirect } from "../../Hooks/useAuthRedirect";
import { postFetch } from "../../helpers/facade";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useAuthRedirect();

  const emptyDetails = email === "" || password === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await postFetch("users/login", { email, password });
      console.log("res", res);

      if (res.statusCode === 200) {
        Cookies.set("accessToken", res.data.accessToken);
        Cookies.set("fullName", res.data.user.fullName);
        Cookies.set("email", res.data.user.email);
        setLoading(false);
        return navigate("/risk");
      }
    } catch (error) {
      setLoading(false);
      return showNotification("Something went wrong. Try again later", "error");
    }
  };

  return (
    <section className="h-dvh w-dvw flex items-center justify-center">
      <div className="px-5 w-[90%] md:w-2/3 lg:w-1/2 gap-2 flex flex-col shadow rounded-lg bg-gray-200 py-10 sm:py-20">
        <h3 className="text-blue-800 text-2xl font-bold sm:text-3xl md:text-4xl text-left -mt-5 mb-7">
          Login to BlueOcean
        </h3>
        <div className="mb-5">
          <label
            htmlFor="username-success"
            className="block mb-2 text-sm font-medium"
          >
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border outline-none border-gray-500 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 "
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="passowrd"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border outline-none border-gray-500 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 "
            placeholder="Enter password"
          />
        </div>
        <Link
          to={"/login"}
          className="text-xs sm:text-md text-right text-blue-800 font-bold flex-end"
        >
          Forgot password?
        </Link>
        <div className="text-center flex flex-col gap-4">
          <button
            disabled={emptyDetails || loading}
            className={`w-full h-10 ${
              emptyDetails || loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-blue-800"
            }  text-white`}
            onClick={handleSubmit}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-xs md:text-base">
            Want to know more about BluOcean?{" "}
            <Link to={"/signup"} className="text-blue-800 font-bold underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
