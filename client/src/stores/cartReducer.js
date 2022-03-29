import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    name: "",
    address: "",
    phone: "",
};

const cart = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {},
});

export const {} = cart.actions;

export {};

export default cart.reducer;
