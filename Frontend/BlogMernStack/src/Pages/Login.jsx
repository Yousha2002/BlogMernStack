import React, { useContext, useState } from "react";
import { URL } from "../Url";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserr } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUserr(res.data); // Store the user data in state
      navigate("/"); // Navigate to homepage on successful login
    } catch (err) {
      // Better error handling
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-100 shadow-md">
        <h1 className="text-lg md:text-2xl font-bold text-black">
          <Link to="/">Blog Market</Link>
        </h1>
        <h3>
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </Link>
        </h3>
      </div>

      <div className="w-full flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="flex flex-col justify-center items-center space-y-6 w-[90%] md:w-[30%] bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Log in to your account
          </h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
            type="email"
            placeholder="Enter your email"
          />

          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded-lg shadow-md hover:bg-black"
          >
            Log in
          </button>

          {error && <h3 className="text-red-500 text-sm">{error}</h3>}

          <div className="flex justify-center items-center space-x-2 text-gray-600">
            <p>New here?</p>
            <Link
              to="/register"
              className="text-black font-medium hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
