import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "../../app/Slicers/auth.Slice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [inputPara, setInputPara] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandle = (e) => {
    setInputPara({ ...inputPara, [e.target.name]: e.target.value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(loginUser(inputPara))
      .then((result) => {
        if (loginUser.fulfilled.match(result)) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("Login Failed", error);
        setError("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
        <form onSubmit={submitHandle} className="mt-5 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 relative flex items-center">
              <FaEnvelope className="absolute left-3 text-gray-500" />
              <input
                name="email"
                type="email"
                className="w-full pl-10 pr-3 rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter Email Address"
                onChange={changeHandle}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-1 relative flex items-center">
              <FaLock className="absolute left-3 text-gray-500" />
              <input
                name="password"
                type="password"
                className="w-full pl-10 pr-3 rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter Your Password"
                onChange={changeHandle}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register Yourself!
          </Link>
        </p>
      </div>
    </div>
  );
}
