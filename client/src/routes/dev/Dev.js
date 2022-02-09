import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductItem from "../../components/ProductItem/ProductItem";

const Dev = () => {
  return (
    <div className="p-4">
      <p> This is a developer page to test react components.</p>
      <div className="mb-4">
        <h1 className="font-bold text-3xl mb-2">Navbar</h1>
        <Navbar />
      </div>

      <div>
        <h1 className="font-bold text-3xl mb-2">ProductItem</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </div>
    </div>
  );
};

export default Dev;
