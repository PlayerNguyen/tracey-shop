import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "react-feather";

const Controller = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([
            ...items,
            { name: "Xây dựng cấu hình máy tính", icon: <ShoppingCart />, url: "/build" },
            { name: "Giỏ hàng", icon: <ShoppingCart />, url: "/cart" },
            { name: "Đăng nhập", icon: <User />, url: "/login" },
        ]);
    }, []);
    return (
        <div className="flex flex-row text-gray-500 mx-0 md:mx-12 gap-3 items-end align-middle mt-4 md:my-0">
            {/* <Link to="/" className="flex flex-col align-baseline items-center p-2">
        <ShoppingCart />
        <span>Đơn hàng</span>
      </Link> */}
            {items &&
                items.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={item.url}
                            className="flex flex-col align-middle items-center p-2"
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
        </div>
    );
};

export default Controller;
