import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatVndCurrency, getImageUrl } from "../../helpers/Common";
import * as cartActions from "../../stores/cartReducer";

export default function ProductItem({ product }) {
    const dispatch = useDispatch();

    const addProductToCart = () => {
        dispatch(cartActions.addProductToCart(product));
    };

    const productStockStatus = product.stock ? (
        <div>
            <div>
                <span className="font-semibold text-green-500">
                    <FontAwesomeIcon icon="check" /> Có hàng
                </span>
            </div>
            <div>
                <span
                    className="font-semibold hover:underline cursor-pointer"
                    onClick={addProductToCart}
                >
                    <FontAwesomeIcon icon="cart-shopping" />
                </span>
            </div>
        </div>
    ) : (
        <span className="font-semibold">
            <FontAwesomeIcon icon="phone" /> Liên hệ
        </span>
    );

    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-1 cursor-pointer hover:scale-105 ease-in-out duration-200">
                <Link to={`/san-pham/${product.slug}-${product._id}`}>
                    <div>
                        <img
                            src={getImageUrl(product.thumbnail.fileName)}
                            alt={product.name}
                            className="max-w-full"
                        />
                    </div>
                </Link>
                {/* Article description */}
                <div>
                    <div className="p-3">
                        <Link to={`/san-pham/${product.slug}-${product._id}`}>
                            <div>
                                <span className="font-bold text-lg">{product.name}</span>
                            </div>
                        </Link>
                        {!product.sale ? (
                            <>
                                <div className="flex">
                                    <div className="flex-grow flex items-end">
                                        {productStockStatus}
                                    </div>
                                    <div className="text-right">
                                        <div>
                                            <span className="font-bold text-xl text-red-500">
                                                {formatVndCurrency(product.sale)}
                                            </span>
                                        </div>
                                        <div>
                                            <div>
                                                <span className="line-through text-gray-500">
                                                    {formatVndCurrency(product.price)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex">
                                    <div className="flex-grow flex items-end">
                                        {productStockStatus}
                                    </div>
                                    <div className="flex items-end">
                                        <span className="font-bold text-xl text-red-500">
                                            {formatVndCurrency(product.price)}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
