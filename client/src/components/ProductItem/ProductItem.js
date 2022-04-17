import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { formatVndCurrency, getImageUrl } from "../../helpers/Common";
export default function ProductItem({ product }) {
    const productStockStatus = product.stock ? (
        <span className="font-semibold text-green-500">
            <FontAwesomeIcon icon="check" /> Còn hàng
        </span>
    ) : (
        <span className="font-semibold">
            <FontAwesomeIcon icon="phone" /> Liên hệ
        </span>
    );
    
    return (
        <Link to={`/san-pham/${product.slug}-${product._id}`}>
            <div className="bg-white shadow-lg rounded-lg p-1 cursor-pointer hover:scale-105 ease-in-out duration-200">
                {/* Header, image */}
                <div>
                    <img
                        src={getImageUrl(product.thumbnail.fileName)}
                        alt={product.name}
                        className="max-w-full"
                    />
                </div>

                {/* Article description */}
                <div>
                    <div className="p-3">
                        <div>
                            <span className="text-gray-500 text-lg">{product.name}</span>
                        </div>
                        {product.sale ? (
                            <>
                                <div className="text-right w-full">
                                    <span className="font-bold text-xl text-red-500">
                                        {formatVndCurrency(product.sale)}
                                    </span>
                                </div>
                                <div className="flex">
                                    <div className="flex-grow">{productStockStatus}</div>
                                    <div>
                                        <span className="line-through text-gray-500">
                                            {formatVndCurrency(product.price)}
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex">
                                    <div className="flex-grow">{productStockStatus}</div>
                                    <div>
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
        </Link>
    );
}
