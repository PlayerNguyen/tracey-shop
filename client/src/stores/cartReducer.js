import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: [],
    name: "",
    address: "",
    phone: "",
};

const cart = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const existProduct = state.cart.find((_product) => _product._id === action.payload._id);
            if (existProduct) {
                existProduct.quantity += 1;
            } else {
                state.cart.push({ _id: action.payload._id, data: action.payload, quantity: 1 });
            }
            toast.success("Thêm sản phẩm vào giỏ hàng thành công");
        },
        removeProductFromCart: (state, action) => {
            state.cart = state.cart.filter((_product) => _product._id !== action.payload);
            toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
        },
        changeProductQuantity: (state, action) => {
            const product = state.cart.find((_product) => _product._id === action.payload._id);
            product.quantity = action.payload.quantity;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
    },
});

export const {
    addProductToCart,
    removeProductFromCart,
    changeProductQuantity,
    setName,
    setAddress,
    setPhone,
} = cart.actions;

export {};

export default cart.reducer;
