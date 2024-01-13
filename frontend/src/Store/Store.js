import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../Slice/ProductSlice";


const Store = configureStore({
    reducer: {product: ProductSlice},
    devTools: true
})

export default Store;
