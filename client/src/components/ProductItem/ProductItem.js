import React, { useState } from "react";
import Dummy from "dummyjs";
import { NumberWithComma } from "../../helpers/NumberWithCommas";
export default function ProductItem() {
  const [productMetadata, setProductMetadata] = useState({
    name: "Sony KIX-A1",
    price: 10000000,
    description: "Sony KIX-A1",
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-1 cursor-pointer hover:scale-105 ease-in-out duration-300">
      {/* Header, image */}
      <div>
        <img
          src={Dummy.image(375, 375)}
          alt={Dummy.text()}
          className="max-w-full"
        />
      </div>

      {/* Article description */}
      <div>
        <div className="p-3 flex flex-col">
          <span className="text-gray-500 text-lg">
            {productMetadata && productMetadata.name}
          </span>
          {/* Total-Price */}
          <span className="font-bold text-xl ">
            {productMetadata && NumberWithComma(productMetadata.price, ".")}
          </span>
          {/* Pre-sale price */}
          <span className="line-through text-gray-500">
            item__presale__price
          </span>
        </div>
      </div>
    </div>
  );
}
