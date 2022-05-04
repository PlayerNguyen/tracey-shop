import AxiosHelper from '../helpers/AxiosHelper';

async function getAllOrder() {
  return AxiosHelper({
    url: '/orders',
    method: 'GET',
  });
}

async function createOrder(data) {
  return AxiosHelper({
    url: '/orders',
    method: 'POST',
    data,
  });
}

async function updateOrder(id, data) {
  return AxiosHelper({
    url: `/orders/${id}`,
    method: 'PUT',
    data,
  });
}

async function getUserOrders() {
  return AxiosHelper({
    url: '/orders/my-order',
    method: 'GET',
  });
}

const OrderRequest = { createOrder, updateOrder, getUserOrders, getAllOrder };
export default OrderRequest;
