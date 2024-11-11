import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signUp } from "../../app/Slicers/auth.Slice";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [inputPara, setInputPara] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandle = (e) => {
    setInputPara({ ...inputPara, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const result = await dispatch(signUp(inputPara));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
      setInputPara({ firstName: "", lastName: "", email: "", password: "" });
      setError(null);
    } else {
      setError(result.payload);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create a New Account
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={submitHandle}
        >
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaUser className="text-gray-500 ml-3" />
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="flex-1 block w-full py-2 px-3 border-0 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter First Name"
                value={inputPara.firstName}
                onChange={changeHandle}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaUser className="text-gray-500 ml-3" />
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="flex-1 block w-full py-2 px-3 border-0 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Last Name"
                value={inputPara.lastName}
                onChange={changeHandle}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaEnvelope className="text-gray-500 ml-3" />
              <input
                id="email"
                name="email"
                type="email"
                className="flex-1 block w-full py-2 px-3 border-0 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Email Address"
                value={inputPara.email}
                onChange={changeHandle}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaLock className="text-gray-500 ml-3" />
              <input
                id="password"
                name="password"
                type="password"
                className="flex-1 block w-full py-2 px-3 border-0 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Password"
                value={inputPara.password}
                onChange={changeHandle}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-200"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
