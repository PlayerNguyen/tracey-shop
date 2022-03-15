import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../../helpers/Common";

function MenuItem({ item, onClick, activeMenu }) {
    return (
        <>
            <div
                className={classNames(
                    activeMenu.includes(item.path)
                        ? "bg-gray-600"
                        : "hover:bg-gray-500",
                    "flex font-semibold cursor-pointer my-1 p-2 rounded"
                )}
                onClick={() => onClick(item)}
            >
                <div className="grow">
                    {item.icon && (
                        <FontAwesomeIcon icon={item.icon} fixedWidth />
                    )}{" "}
                    {item.name}
                </div>
            </div>
        </>
    );
}

function AdminLayout() {
    // const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         const tokenValid = checkTokenValid();
    //         if (!tokenValid) {
    //             navigate("/");
    //         }
    //     }
    // }, []);

    const handleRedirect = (menu) => {
        if (!menu.subMenu) {
            navigate(menu.path);
        }
    };

    const menu = [
        {
            name: "Tài khoản",
            path: "/dashboard/user",
            icon: "user",
        },
        {
            name: "Danh mục hàng",
            path: "/dashboard/category",
            icon: "list",
        },
        {
            name: "Sản phẩm",
            path: "/dashboard/product",
            icon: "box-open",
        },
        {
            name: "Hóa đơn bán hàng",
            path: "/dashboard/output-receipt",
            icon: "box-open",
        },
        {
            name: "Nhập hàng",
            path: "/dashboard/input-receipt",
            icon: "box-open",
        },
    ];
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <div className="flex grow">
                    <div className="bg-gray-900 p-4 text-white w-1/6 flex-none">
                        <div className="text-center my-2">
                            <Link to="/dashboard">
                                <span className="hidden lg:block font-mono text-2xl text-purple-50">
                                    BRAND.COM
                                </span>
                            </Link>
                            <Link to="/dashboard">
                                <span className="block lg:hidden font-mono text-2xl text-purple-50">
                                    BRAND
                                </span>
                            </Link>
                        </div>
                        <div className="ring-2 ring-white rounded p-2">
                            {menu.map((_item, _idx) => (
                                <MenuItem
                                    key={_idx}
                                    onClick={handleRedirect}
                                    item={_item}
                                    activeMenu={location.pathname}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="grow mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                        <Outlet />
                    </div>
                </div>
                <div className="flex items-center bg-gray-800 text-gray-300 p-3">
                    <span className="mx-auto">
                        Player Zaff, 2022. All rights reserved.
                    </span>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;