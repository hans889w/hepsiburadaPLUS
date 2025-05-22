import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../products/productsSlice"

interface FavoritesState {
   items: Product[]
}

const initialState: FavoritesState = {
    items: []
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
      toggleFavorite: (state, action: PayloadAction<Product>) => {
         const product = action.payload
         const index = state.items.findIndex(item => item.id === product.id)
         if (index >= 0) {
             state.items = state.items.filter(item => item.id !== product.id)
         } else {
             state.items = [...state.items, product]
         }
      }
  }
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer