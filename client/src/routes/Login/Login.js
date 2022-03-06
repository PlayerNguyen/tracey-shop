import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import UserRequest from "../../requests/UserRequest";
import { AlertTriangle } from "react-feather";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(true);
    /**
     * Sign in execute
     */
    UserRequest.createSignInRequest(phone, password)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(`err: `, error.response.data);
        setError(error);
      });
  };

    return (
        <div className="">
            {/* Header */}
            <div>
                <Navbar />
            </div>

            <div className="m-5 p-5 bg-white rounded shadow-md md:w-1/2 lg:w-1/3 md:mx-auto md:my-12">
                <div className="w-auto my-5 md:mx-auto px-5">
                    <h1 className="text-3xl font-bold mb-4">Đăng nhập</h1>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-gray-700">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                className="border border-gray-400 p-2 w-full outline-none rounded"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-2 bg-red-300 text-red-900 rounded flex flex-row gap-3 align-baseline items-center">
                                <div className="basis-2 p-2">
                                    <AlertTriangle />
                                </div>
                                <div>{error && error.response.data.error}</div>
                            </div>
                        )}

                        <button className="p-2 text-center bg-blue-400 rounded text-base mb-4">
                            Đăng nhập
                        </button>

                        <Link
                            className="p-2 text-center bg-green-400 rounded text-base mb-4"
                            to="/signup"
                        >
                            Đăng ký
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
