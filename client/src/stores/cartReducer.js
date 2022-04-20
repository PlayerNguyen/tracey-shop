import { createSlice } from "@reduxjs/toolkit";

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
            state.cart.push({ _id: action.payload._id, product: action.payload, quantity: 1 });
        },
        removeProductFromCart: (state, action) => {
            state.cart = state.cart.filter((_product) => _product._id !== action.payload._id);
        },
        changeProductQuantity: (state, action) => {
            const product = state.cart.find((_product) => _product._id === action.payload._id);
            product.quantity += action.payload.quantity;
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
