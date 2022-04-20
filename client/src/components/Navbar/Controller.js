import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../stores/authReducer";
import { ProfileModal } from "../";

const Controller = () => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authActions.logout());
    };

    const handleOpenProfile = () => {
        dispatch(authActions.setProfileModal(true));
    };

    return (
        <div className="flex flex-row text-gray-500 mx-0 md:mx-12 gap-3 items-center align-middle mt-4 md:my-0">
            <Link to="/build" className="flex flex-col align-middle items-center p-2">
                <ShoppingCart />
                <span>Xây dựng cấu hình máy tính</span>
            </Link>
            <Link to="/gio-hang" className="flex flex-col align-middle items-center p-2">
                <ShoppingCart />
                <span>Giỏ hàng</span>
            </Link>
            {isAuthenticated ? (
                <div className="relative">
                    <div>
                        <button
                            type="button"
                            className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            id="user-menu-button"
                            aria-expanded="false"
                            aria-haspopup="true"
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </button>
                    </div>
                    {profileMenuOpen && (
                        <div
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                        >
                            <div
                                className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                role="menuitem"
                                onClick={handleOpenProfile}
                            >
                                Thông tin cá nhân
                            </div>
                            <Link to="/dashboard">
                                <div
                                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Quản lý
                                </div>
                            </Link>
                            <div
                                className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                role="menuitem"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login" className="flex flex-col align-middle items-center p-2">
                    <User />
                    <span>Đăng nhập</span>
                </Link>
            )}
            <ProfileModal />
        </div>
    );
};

export default Controller;
