import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice.jsx';
import productSlice from './productSlice.jsx';
import authSlice from './productSlice.jsx';

export const store =
configureStore({
    reducer:
{
    cart:cartSlice,
    product:productSlice,
    auth:authSlice
}})

export default store;