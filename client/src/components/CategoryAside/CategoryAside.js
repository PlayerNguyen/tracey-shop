import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import {} from 'react-feather'

const CategoryAside = () => {
  const [items] = useState([
    {
      name: "Máy tính",
      url: "/danh-muc/may-tinh",
      items: [{ sectionName: "Theo giá", items: [{ name: "Duới 10 triệu" }] }],
    },
    {
      name: "Điện thoại",
      url: "/danh-muc/dien-thoai",
      items: [{ sectionName: "Theo giá", items: [{ name: "Duới 10 triệu" }] }],
    },
  ]);
  return (
    <div className="md:basis-1/6">
      <div className="flex flex-col gap-3 bg-white m-5 p-1 rounded shadow-sm ">
        {items &&
          items.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.url}
                className="hover:bg-blue-500 px-2 py-1 rounded hover:text-white"
              >
                {item.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryAside;
