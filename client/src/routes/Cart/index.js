import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatVndCurrency, getImageUrl } from '../../helpers/Common';
import * as cartActions from '../../stores/cartReducer';

function Cart() {
  const { cart, name, address, phone } = useSelector((state) => state.cart);
  const {
    profile: { info },
  } = useSelector((state) => state.auth);

  const totalPrice = React.useMemo(() => {
    return cart
      .map(
        (_product) =>
          (_product.data.sale || _product.data.price) * _product.quantity,
      )
      .reduce((a, b) => a + b, 0);
  }, [cart]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (info._id) {
      dispatch(cartActions.setName(info.name || ''));
      dispatch(cartActions.setPhone(info.phone || ''));
      dispatch(cartActions.setAddress(info.address || ''));
    }
  }, [info]);

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
    if (
      window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')
    ) {
      dispatch(cartActions.removeProductFromCart(_id));
    }
  };

  const handleChangeShippingInfo = (name) => (e) => {
    dispatch(cartActions.setProperty({ name, value: e.target.value }));
  };

  const handleOrder = () => {
    dispatch(
      cartActions.createOrder({
        products: cart.map((_product) => ({
          product: _product._id,
          quantity: _product.quantity,
          price: _product.data.sale || _product.data.price,
        })),
        name,
        address,
        phone,
      }),
    );
  };

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <div className="bg-white p-4">
      <h1 className="text-3xl font-semibold">Giỏ hàng</h1>
      {cart.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <label>Họ tên</label>
              <div>
                <input
                  className="input w-full"
                  onChange={handleChangeShippingInfo('name')}
                  value={name}
                />
              </div>
            </div>
            <div>
              <label>SĐT</label>
              <div>
                <input
                  className="input w-full"
                  onChange={handleChangeShippingInfo('phone')}
                  value={phone}
                />
              </div>
            </div>
            <div>
              <label>Địa chỉ</label>
              <div>
                <input
                  className="input w-full"
                  onChange={handleChangeShippingInfo('address')}
                  value={address}
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              className="text-lg hover:underline hover:font-semibold"
              onClick={handleClearCart}
            >
              Xóa giỏ hàng
            </button>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-center">STT</th>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th className="text-center w-px">Số lượng</th>
                  <th className="text-center">Đơn giá</th>
                  <th className="text-center">Tổng tiền</th>
                  <th></th>
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
                                _product.quantity - 1,
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
                                _product._id,
                              )}
                            />
                          </div>
                          <div
                            onClick={() =>
                              handleChangeProductQuantity(
                                _product._id,
                                _product.quantity + 1,
                              )
                            }
                            className="select-none rounded bg-gray-300 px-2 py-1 cursor-pointer hover:bg-gray-400"
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        {formatVndCurrency(price)}
                      </td>
                      <td className="text-center font-semibold text-red-500">
                        {formatVndCurrency(_product.quantity * price)}
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveProduct(_product._id)}
                        >
                          <FontAwesomeIcon
                            icon="trash"
                            className="text-red-500 cursor-pointer"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} className="text-right font-semibold">
                    Tổng tiền:
                  </td>
                  <td className="text-center text-red-500 font-bold">
                    {formatVndCurrency(totalPrice)}
                  </td>
                  <td>
                    <button
                      onClick={handleOrder}
                      className="rounded bg-gray-800 text-white px-2 py-1 font-semibold"
                    >
                      Đặt hàng
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <span className="text-xl">Giỏ hàng chưa có sản phẩm nào</span>
        </>
      )}
    </div>
  );
}

export default Cart;
