import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockProducts } from "./mockData";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
       return mockProducts;
});

const initialState = {
       products: [],
       loading: false,
       error: null,
};

const productSlice = createSlice({
       name: 'products',
       initialState,
       reducers: {
              fetchProductsStart: (state) => {
                     state.loading = true;
              },
              fetchProductsSuccess: (state, action) => {
                     state.loading = false;
                     state.products = action.payload;
              },
              fetchProductsFailure: (state, action) => {
                     state.loading = false;
                     state.error = action.payload;
              }
       },
       extraReducers: (builder) => {
              builder
                     .addCase(fetchProducts.pending, (state) => {
                            state.loading = true;
                     })
                     .addCase(fetchProducts.fulfilled, (state, action) => {
                            state.loading = false;
                            state.products = action.payload;
                     })
                     .addCase(fetchProducts.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message;
                     });
       },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;
export default productSlice.reducer;