import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault(true);
  };
  return (
    <div className="">
      {/* Header */}
      <div>
        <Navbar />

        <div className="m-5 p-5 bg-white rounded shadow-md md:w-1/2 md:mx-auto md:my-12">
          <div className="w-auto my-5 md:w-1/2 md:mx-auto">
            <h1 className="text-3xl font-bold mb-4">Đăng nhập</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="email"
                  className="border border-gray-400 p-2 w-full outline-none rounded"
                  id="email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-gray-700">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="border border-gray-400 p-2 w-full outline-none rounded"
                  id="password"
                />
              </div>
              <button
                className="p-2 text-center bg-blue-400 rounded text-base mb-4"
                to="/"
              >
                Đăng nhập
              </button>

              <button
                className="p-2 text-center bg-green-300 rounded text-base mb-4"
                to="/"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
