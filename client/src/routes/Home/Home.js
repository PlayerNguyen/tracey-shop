import React from "react";
import ProductItem from "../../components/ProductItem/ProductItem";

const Home = () => {
    return (
        <>
            <div className="bg-white p-4 my-2">
                <h1 className="font-bold text-3xl mb-2">Máy tính</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>
            <div className="bg-white p-4 my-2">
                <h1 className="font-bold text-3xl mb-2">Điện thoại</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>
            <div className="bg-white p-4 my-2">
                <h1 className="font-bold text-3xl mb-2">Bàn phím</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>
            <div className="bg-white p-4 my-2">
                <h1 className="font-bold text-3xl mb-2">Màn hình</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>
        </>
    );
};

export default Home;
