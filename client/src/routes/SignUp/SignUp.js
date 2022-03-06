import React, { useEffect, useState } from "react";
import { AlertTriangle } from "react-feather";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Validator } from "../../helpers/Validator";
import UserRequest from "../../requests/UserRequest";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(true);
    setError(null);
    /**
     * Sign up execute
     */
    console.log(phone, password, confirmPassword);
    // Check phone number
    if (!Validator.isValidatePhone(phone)) {
      setError({
        message: "Số điện thoại không hợp lệ",
      });
      return;
    }

    // Check password and confirm
    if (password !== confirmPassword) {
      setError({
        message: "Mật khẩu và mật khẩu nhập lại không khớp",
      });
      return;
    }

    // Sign up
    UserRequest.createSignUpRequest(phone, name, password, email)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    setIsValidForm(
      phone && password && confirmPassword && password === confirmPassword
    );
  }, [phone, password, confirmPassword]);

  return (
    <div>
      {/* Header */}
      <div>
        <Navbar />
      </div>
      <div className="m-5 p-5 bg-white rounded shadow-md md:w-1/2 lg:w-1/3 md:mx-auto md:my-12">
        <div className="w-auto my-5 md:mx-auto px-5">
          <h1 className="text-3xl font-bold mb-4">Đăng ký</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="text-gray-700">
                Tên
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 w-full outline-none rounded"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="border border-gray-400 p-2 w-full outline-none rounded"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-gray-700">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                className="border border-gray-400 p-2 w-full outline-none rounded"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            <button
              className={`p-2 text-center rounded text-base mb-4 ease-in-out duration-200
              ${
                isValidForm
                  ? "bg-blue-400 hover:bg-blue-600 hover:text-white"
                  : "bg-blue-200"
              }`}
              disabled={!isValidForm}
            >
              Đăng ký
            </button>

            <Link
              className="p-2 text-center bg-green-400 rounded text-base mb-4"
              to="/login"
            >
              Đăng nhập
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
