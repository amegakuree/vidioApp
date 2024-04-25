/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handdleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { email, password };
      const response = await axios.post(
        "http://localhost:4000/login",
        requestBody
      );
      console.log(response);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("name", response.data.dataName);
      Swal.fire({
        icon: "success",
        title: "Succes Login",
      });
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: `${error.response.data.message}`,
      });
    }
  }

  return (
    <div className="bg-white flex justify-center items-center ">
      <div className=" mt-320  m-auto bg-white">
        <img
          src="https://img.freepik.com/free-vector/shopping-cart-girl-ordering-food-via-mobile-app-tablet-sofa-with-different-food-products-screen-online-grocery-store-flat-vector-illustration-delivery-service-concept-banner_74855-24992.jpg?w=740"
          alt=""
        />
      </div>

      <div className="lg:p-36 md:p-52 h-screen sm:20 p-8 lg:w-1/2 bg-orange-200">
        <h1 className="text-2xl font-semibold mb-20 text-center">
          Calling Us!
        </h1>
        <form onSubmit={handdleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black">
              email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />

            <div className="mb-4 mt-6">
              <label htmlFor="password" className="block text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-400 mt-6 hover:bg-orange-600 text-black font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        {/* Sign up  Link */}
        <div className="mt-6 text-black text-center">
          <a>
            Don't have an account yet?{" "}
            <Link to={"/register"}>
              <span className=" text-blue-700 hover:underline hover:cursor-pointer">
                Register
              </span>
            </Link>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
