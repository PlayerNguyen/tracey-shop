import React from 'react';
import Modal from '../../../components/Modal';
import {
  classNames,
  formatVndCurrency,
  getImageUrl,
} from '../../../helpers/Common';
import ProductRequest from '../../../requests/ProductRequest';
import _ from 'lodash';

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

  const addProduct = () => {
    setOrderDetail({
      ...orderDetail,
      products: [...orderDetail.products, null],
    });
  };

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
            <button
              className="mt-4 font-semibold hover:underline hover:text-blue-500"
              onClick={addProduct}
            >
              Thêm sản phẩm
            </button>
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
                  <ProductRow
                    key={_data?.product?.id || _idx}
                    data={_data}
                    index={_idx}
                  />
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

function ProductRow({ data, index }) {
  const [productDetail, setProduct] = React.useState(
    data || {
      product: {
        thumbnail: {},
        name: '',
      },
      quantity: 1,
      price: 0,
      sale: 0,
    },
  );
  const [productsFound, setProductsFound] = React.useState([]);

  const searchProduct = (e) => {
    const { value } = e.target;
    if (value) {
      ProductRequest.searchProduct(value).then((res) => {
        setProductsFound(res.data);
      });
    }
  };

  const handleSelectProduct = (product) => {
    
  };

  return (
    <>
      <tr>
        <td className="border border-slate-300 text-center">{index + 1}</td>
        <td className="border border-slate-300 w-64">
          <img
            src={getImageUrl(productDetail.product.thumbnail.fileName)}
            alt={productDetail.product.name}
          />
        </td>
        <td className="border border-slate-300 px-2 relative">
          <input
            className="input w-full peer"
            readOnly={Boolean(data)}
            defaultValue={productDetail.product.name}
            onChange={_.debounce(searchProduct, 1000)}
          />
          {productsFound.length > 0 && (
            <div
              className={classNames(
                'p-2 block peer-focus:block absolute top-full max-h-[400px]',
                'border-gray-500 rounded-lg bg-white overflow-auto',
              )}
            >
              {productsFound.map((_product) => (
                <div
                  key={_product.id}
                  className={classNames(
                    'flex items-center p-2 hover:bg-gray-200 rounded-lg',
                    'cursor-pointer',
                  )}
                  onClick={() => handleSelectProduct(_product)}
                >
                  <div className="mr-4">
                    <img
                      className="w-[100px] h-[100px]"
                      src={getImageUrl(_product.thumbnail.fileName)}
                      alt="product-img"
                    />
                  </div>
                  <div>{_product.name}</div>
                </div>
              ))}
            </div>
          )}
        </td>
        <td className="border border-slate-300 text-center px-2">
          <input
            className="input"
            readOnly={Boolean(data)}
            value={productDetail.quantity}
          />
        </td>
        <td className="border border-slate-300 text-center">
          {formatVndCurrency(productDetail.price)}
        </td>
        <td className="border border-slate-300 text-center font-semibold text-red-500">
          {formatVndCurrency(productDetail.quantity * productDetail.price)}
        </td>
      </tr>
    </>
  );
}

export default UpdateOrderDetail;
