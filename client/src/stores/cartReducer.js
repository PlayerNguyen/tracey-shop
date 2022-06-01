import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import orderApi from '../requests/OrderRequest';

const initialState = {
  cart: [],
  name: '',
  address: '',
  phone: '',
};

const cart = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const existProduct = state.cart.find(
        (_product) => _product._id === action.payload._id,
      );
      if (existProduct) {
        existProduct.quantity += 1;
      } else {
        state.cart.push({
          _id: action.payload._id,
          data: action.payload,
          quantity: 1,
        });
      }
      toast.success('Thêm sản phẩm vào giỏ hàng thành công');
    },
    addProductsToCart: (state, action) => {
      const products = action.payload;
      products.forEach((_product) => {
        const existProduct = state.cart.find(
          (__product) => _product._id === __product._id,
        );
        if (existProduct) {
          existProduct.quantity += _product.quantity || 1;
        } else {
          state.cart.push({
            _id: _product._id,
            data: _product,
            quantity: _product.quantity || 1,
          });
        }
      });
      toast.success('Thêm sản phẩm vào giỏ hàng thành công');
    },
    removeProductFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (_product) => _product._id !== action.payload,
      );
      toast.success('Xóa sản phẩm khỏi giỏ hàng thành công');
    },
    changeProductQuantity: (state, action) => {
      const product = state.cart.find(
        (_product) => _product._id === action.payload._id,
      );
      product.quantity = action.payload.quantity;
    },
    setProperty: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addProductToCart,
  addProductsToCart,
  removeProductFromCart,
  changeProductQuantity,
  setProperty,
  clearCart,
  setName,
  setPhone,
  setAddress,
} = cart.actions;

const createOrder = (data) => {
  return async (dispatch) => {
    try {
      await orderApi.createOrder(data);
      dispatch(clearCart());
      toast.success(
        'Đặt hàng thành công. Nhân viên chúng tôi sẽ sớm liên hệ với bạn để xác nhận đơn hàng. Xin chân thành cảm ơn',
      );
    } catch (e) {
      toast.error(
        e.response?.data?.error?.message ||
          'Đặt hàng thất bại, vui lòng thử lại sau.',
      );
      console.error(e);
    }
  };
};

export { createOrder };

export default cart.reducer;
