/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  async function handdleRegister(e) {
    e.preventDefault();
    try {
      const requestBody = { name, email, password };
      const { data } = await axios.post(
        "http://localhost:4000/register",
        requestBody
      );
      Swal.fire({
        icon: "success",
        title: "Succes register",
      });

      console.log(data);
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white flex justify-center items-center ">
      <div className=" mt-320  m-auto bg-white">
        <img
          className="w-96"
          src="https://img.freepik.com/free-photo/3d-illustration-cartoon-man-historical-baroque-costume_183364-80103.jpg?w=826"
          alt=""
        />
      </div>

      <div className="lg:p-36 md:p-52 h-screen sm:20 p-8 lg:w-1/2 bg-orange-200">
        <h1 className="text-2xl font-semibold mb-20 text-center">Caliing Us</h1>
        <form onSubmit={handdleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black">
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <label htmlFor="username" className="block text-black">
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
