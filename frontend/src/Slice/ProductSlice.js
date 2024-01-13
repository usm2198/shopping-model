import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    products: []
}

const url = "http://localhost:5000/api/product"

export const addProduct = createAsyncThunk('product/addproduct', async (product)=>{
    try {
        const token = localStorage.getItem('token')
        const {data} = await axios.post(url, product, {headers: {Auth: token}});
        return data.data
    } catch (error) {
        return error.message   
    }
})

export const putProduct = createAsyncThunk('product/putproduct', async (product)=>{
    try {
        const token = localStorage.getItem('token');
        const {data} = await axios.put(url + `/${product._id}`, product, {headers: {Auth: token}})
        return data.data
    } catch (error) {
        return error.message   
    }
})

export const removeProduct = createAsyncThunk('product/deleteproduct', async (id)=>{
    try {
        const token = localStorage.getItem('token');
        const {data} = await axios.delete(url + `/${id}`,{headers: {Auth: token}});
        return data.data
    } catch (error) {
        return error.message;
    }
})

export const getProduct = createAsyncThunk('product/getproduct', async ()=>{
    try {
        const {data} = await axios.get(url);
        return data.data
    } catch (error) {
        return error.message
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getProduct.fulfilled,(state, {payload}) =>{
            state.products = payload;
        })
        builder.addCase(addProduct.fulfilled,(state, {payload}) =>{
            state.products = state.products.concat(payload);
        })
        builder.addCase(putProduct.fulfilled,(state, {payload}) =>{
            state.products = state.products.map(el => el._id === payload._id ? payload : el);
        })
        builder.addCase(removeProduct.fulfilled,(state, {payload}) =>{
            state.products = state.products.filter(el => el._id !== payload._id);
        })
    }
})

export default productSlice.reducer;
