import moment from 'moment';
import React from 'react';
import { toast } from 'react-toastify';
import { formatVndCurrency } from '../../helpers/Common';
import userApi from '../../requests/UserRequest';
import orderApi from '../../requests/OrderRequest';
import OrderDetailModal from './order-detail-modal';

function MyOrder() {
  const [orders, setOrders] = React.useState([]);
  const [openOrdetDetail, setOpenOrdetDetail] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleCloseOrderDetailModal = () => {
    setOpenOrdetDetail(false);
    setSelectedOrder(null);
  };

  const getUserOrders = async () => {
    try {
      const resp = await orderApi.getUserOrders();
      setOrders(resp.data);
    } catch (e) {
      toast.error(
        e.response?.data?.error?.message ||
          'Lấy danh sách đơn hàng thất bại, vui lòng thử lại sau.',
      );
      console.error(e);
    }
  };

  const handleViewOrderDetail = (order) => {
    setSelectedOrder(order);
    setOpenOrdetDetail(true);
  };

  React.useEffect(() => {
    getUserOrders();
  }, []);

  const STATUS = {
    pending: 'Đang chờ',
    processing: 'Đang xử lý',
    shipped: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
  };

  return (
    <>
      <div className="bg-white p-4">
        <h1 className="text-3xl font-semibold">Đơn hàng của bạn</h1>
        {orders.length > 0 ? (
          <>
            <table className="w-full table-fixed border-collapse mt-4">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-3 bg-gray-800 text-white">
                    Ngày đặt
                  </th>
                  <th className="border border-slate-300 p-3 bg-gray-800 text-white">
                    Trạng thái
                  </th>
                  <th className="border border-slate-300 p-3 bg-gray-800 text-white">
                    Tổng tiền
                  </th>
                  <th className="border border-slate-300 p-3 bg-gray-800 text-white">
                    Chi tiết
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((_order) => (
                  <tr key={_order._id} className="hover:bg-gray-200">
                    <td className="border border-slate-300 p-3">
                      {moment(_order.createdAt).format('DD/MM/YYYY')}
                    </td>
                    <td className="border border-slate-300 p-3">
                      {STATUS[_order.status]}
                    </td>
                    <td className="border border-slate-300 p-3">
                      {formatVndCurrency(_order.totalPrice)}
                    </td>
                    <td className="border border-slate-300 p-3">
                      <span
                        onClick={() => handleViewOrderDetail(_order)}
                        className="cursor-pointer hover:underline hover:font-semibold"
                      >
                        Xem chi tiết
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <OrderDetailModal
              open={openOrdetDetail}
              onClose={handleCloseOrderDetailModal}
              orderDetail={selectedOrder}
            />
          </>
        ) : (
          <>
            <h2 className="text-xl">Bạn chưa mua hàng lần nào.</h2>
          </>
        )}
      </div>
    </>
  );
}

export default MyOrder;
