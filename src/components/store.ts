import { configureStore} from "@reduxjs/toolkit";
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/cartSlice'
import favoritesReducer from '../features/favorites/favoritesSlice' 
import categoriesReducer from '../features/categories/categoriesSlice'
import AuthReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        favorites: favoritesReducer,
        auth: AuthReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch