import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatVndCurrency, getImageUrl } from "../../helpers/Common";
import * as cartActions from "../../stores/cartReducer";

function Cart() {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleChangeProductQuantity = (_id, quantity) => {
        if (quantity > 0) {
            dispatch(cartActions.changeProductQuantity({ _id, quantity }));
        } else {
            handleRemoveProduct(_id);
        }
    };

    const handleUpdateProductQuantity = (_id) => (e) => {
        const quantity = parseInt(e.target.value);
        if (Boolean(quantity)) {
            dispatch(cartActions.changeProductQuantity({ _id, quantity }));
        }
    };

    const handleRemoveProduct = (_id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
            dispatch(cartActions.removeProductFromCart(_id));
        }
    };

    return (
        <div className="bg-white p-4">
            <h1 className="text-3xl font-semibold">Giỏ hàng</h1>
            <div className="grid grid-cols-3 gap-8">
                <div>
                    <label>Họ tên</label>
                    <div>
                        <input className="input w-full" />
                    </div>
                </div>
                <div>
                    <label>SĐT</label>
                    <div>
                        <input className="input w-full" />
                    </div>
                </div>
                <div>
                    <label>Địa chỉ</label>
                    <div>
                        <input className="input w-full" />
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th className="text-center w-px">Số lượng</th>
                            <th className="text-center">Đơn giá</th>
                            <th className="text-center">Tổng tiền</th>
                            <th className="text-center">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((_product, _idx) => {
                            const price = _product.data.sale || _product.data.price;
                            return (
                                <tr key={_product._id}>
                                    <td className="text-center">{_idx + 1}</td>
                                    <td className="w-64">
                                        <img
                                            src={getImageUrl(_product.data.thumbnail.fileName)}
                                            alt={_product.data.name}
                                        />
                                    </td>
                                    <td>{_product.data.name}</td>
                                    <td className="text-center">
                                        <div className="flex items-center w-full justify-center gap-x-4">
                                            <div
                                                onClick={() =>
                                                    handleChangeProductQuantity(
                                                        _product._id,
                                                        _product.quantity - 1
                                                    )
                                                }
                                                className="select-none rounded bg-gray-300 px-2 py-1 cursor-pointer hover:bg-gray-400"
                                            >
                                                -
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="input w-16"
                                                    value={_product.quantity}
                                                    onChange={handleUpdateProductQuantity(
                                                        _product._id
                                                    )}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleChangeProductQuantity(
                                                        _product._id,
                                                        _product.quantity + 1
                                                    )
                                                }
                                                className="select-none rounded bg-gray-300 px-2 py-1 cursor-pointer hover:bg-gray-400"
                                            >
                                                +
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">{formatVndCurrency(price)}</td>
                                    <td className="text-center font-semibold text-red-500">
                                        {formatVndCurrency(_product.quantity * price)}
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveProduct(_product._id)}>
                                            <FontAwesomeIcon
                                                icon="trash"
                                                className="text-red-500 cursor-pointer"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Cart;
