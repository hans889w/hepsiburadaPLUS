import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  thumbnail: string
  category: string
  images:string[]

}

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
  status:any
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get('https://dummyjson.com/products?limit=25')
  return response.data.products as Product[]
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    status
  } as ProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error'
      })
  }
})

export default productsSlice.reducer