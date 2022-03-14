import React from "react";

function Filter() {
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-2">
                <div className="font-semibold text-lg border border-gray-300 rounded-lg text-center py-1">
                    Lọc sản phẩm
                </div>
                <div>
                    Khoảng giá
                    <div className="flex">
                        <input type="text" className="input w-full mr-2" />
                        {"-"}
                        <input type="text" className="input w-full ml-2" />
                    </div>
                </div>
                <div>
                    Hãng sản xuất
                </div>
            </div>
        </>
    );
}

export default Filter;
