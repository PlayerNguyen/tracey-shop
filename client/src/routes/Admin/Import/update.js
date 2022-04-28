import React from 'react';
import Modal from '../../../components/Modal';
import {
  classNames,
  formatVndCurrency,
  getImageUrl,
} from '../../../helpers/Common';

function UpdateOrderDetail({ open, onClose, updateOrder }) {
  const [orderDetail, setOrderDetail] = React.useState({
    _id: '',
    name: '',
    phone: '',
    address: '',
    products: [],
    totalPrice: 0,
  });

  React.useEffect(() => {
    if (updateOrder) {
      setOrderDetail({ ...orderDetail, ...updateOrder });
    }
  }, [updateOrder]);

  const readOnly = Boolean(updateOrder);

  return (
    <>
      {orderDetail && (
        <Modal dimmer={true} onClose={onClose} open={open}>
          <div className="w-2/3 bg-white border rounded-xl p-4">
            <p className="text-xl font-semibold">Thông tin đơn hàng</p>
            <div className="grid grid-cols-3 gap-x-4">
              <div>
                <div className="font-semibold">Họ tên người mua:</div>
                <div>
                  <input
                    className={classNames(!readOnly && 'input w-full')}
                    value={orderDetail.name}
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div>
                <div className="font-semibold">SĐT:</div>
                <div>
                  <input
                    className={classNames(!readOnly && 'input w-full')}
                    value={orderDetail.phone}
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <div>
                <div className="font-semibold">Địa chỉ giao hàng:</div>
                <div>
                  <input
                    className={classNames(!readOnly && 'input w-full')}
                    value={orderDetail.address}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            </div>
            <button className='mt-4 font-semibold hover:underline hover:text-blue-500'>Thêm sản phẩm</button>
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr>
                  <th className="text-white bg-gray-800 text-center">STT</th>
                  <th className="text-white bg-gray-800">Ảnh</th>
                  <th className="text-white bg-gray-800">Tên sản phẩm</th>
                  <th className="text-white bg-gray-800 text-center w-px">
                    Số lượng
                  </th>
                  <th className="text-white bg-gray-800 text-center">
                    Đơn giá
                  </th>
                  <th className="text-white bg-gray-800 text-center">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.products.map((_data, _idx) => (
                  <tr key={_data.product._id}>
                    <td className="border border-slate-300 text-center">
                      {_idx + 1}
                    </td>
                    <td className="border border-slate-300 w-64">
                      <img
                        src={getImageUrl(_data.product.thumbnail.fileName)}
                        alt={_data.product.name}
                      />
                    </td>
                    <td className="border border-slate-300">
                      {_data.product.name}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {_data.quantity}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {formatVndCurrency(_data.price)}
                    </td>
                    <td className="border border-slate-300 text-center font-semibold text-red-500">
                      {formatVndCurrency(_data.quantity * _data.price)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="text-right font-semibold">
                    Tổng tiền:
                  </td>
                  <td className="text-center text-red-500 font-bold">
                    {formatVndCurrency(orderDetail.totalPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </>
  );
}

export default UpdateOrderDetail;
