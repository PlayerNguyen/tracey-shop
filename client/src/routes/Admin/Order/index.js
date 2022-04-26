import React from 'react';
import UpdateOrder from './update';
import { v1 as uuidv1 } from 'uuid';
import { toast } from 'react-toastify';
import orderApi from '../../../requests/OrderRequest';
import { formatVndCurrency } from '../../../helpers/Common';
import ReactSelect from 'react-select';

function Order() {
  const [orders, setOrders] = React.useState([]);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [randomKey, setRandomKey] = React.useState(0);

  const fetchOrders = async () => {
    try {
      const resp = await orderApi.getAllOrder();
      setOrders(resp.data);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenUpdateModal = () => {
    setRandomKey(uuidv1());
    setUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModal(false);
  };

  const handleSave = async (orderData) => {
    // try catch is in UpdateOrder
    await orderApi.createOrder(orderData);
    toast.success('Tạo tài khoản thành công');
    await fetchOrders();
  };

  const handleChangeStatus = (orderId) => async (selectedOption) => {
    try {
      await orderApi.updateOrder(orderId, { status: selectedOption.value });
      toast.success('Thay đổi trạng thái thành công');
      setOrders(
        orders.map((_order) => {
          if (_order._id === orderId) {
            return { ..._order, status: selectedOption.value };
          }
          return _order;
        }),
      );
    } catch (e) {
      toast.error('Thay đổi trạng thái thất bại');
      console.error(e);
    }
  };

  const STATUS = {
    pending: 'Đang chờ',
    processing: 'Đang xử lý',
    shipped: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
  };

  const statusOptions = Object.keys(STATUS).map((status) => ({
    value: status,
    label: STATUS[status],
  }));

  return (
    <>
      <div className="text-2xl font-bold">Hóa đơn bán hàng</div>
      <button
        className="bg-transparent hover:underline hover:text-indigo-500 font-semibold px-2 py-1 mt-4"
        onClick={handleOpenUpdateModal}
      >
        Tạo mới
      </button>
      <div className="border rounded mt-2">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="text-center w-16">#</th>
              <th>Điện thoại</th>
              <th>Họ tên</th>
              <th>Địa chỉ</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((_order, _idx) => (
              <tr key={_order._id} className="border-t even:bg-slate-50">
                <td className="text-center py-2">{_idx + 1}</td>
                <td className="py-2">{_order.phone}</td>
                <td className="py-2">{_order.name}</td>
                <td className="py-2">{_order.address}</td>
                <td className="py-2">{formatVndCurrency(_order.totalPrice)}</td>
                <td className="py-2">
                  <ReactSelect
                    options={statusOptions}
                    value={statusOptions.find(
                      (_option) => _option.value === _order.status,
                    )}
                    onChange={handleChangeStatus(_order._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateOrder
        key={randomKey}
        open={updateModal}
        onClose={handleCloseUpdateModal}
        onSave={handleSave}
      />
    </>
  );
}

export default Order;
