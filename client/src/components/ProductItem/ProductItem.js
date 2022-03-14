import React from "react";
import { Link } from "react-router-dom";
import { formatVndCurrency, getImageUrl } from "../../helpers/Common";
export default function ProductItem({ product }) {
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
                    <div className="p-3 flex flex-col">
                        <span className="text-gray-500 text-lg">{product.name}</span>
                        {/* Total-Price */}
                        <span className="font-bold text-xl text-red-500 text-right">
                            {formatVndCurrency(product.sale)}
                        </span>
                        {/* Pre-sale price */}
                        <span className="line-through text-gray-500 text-right">
                            {formatVndCurrency(product.price)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
