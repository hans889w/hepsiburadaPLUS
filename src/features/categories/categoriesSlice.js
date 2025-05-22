import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axious from 'axios';
const initialState = {
    items: [],
    loading: false,
    error: null
};
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axious.get('https://dummyjson.com/products/categories');
    return response.data;
});
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, state => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
            .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error';
        });
    }
});
export default categoriesSlice.reducer;
