import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: []
};
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const product = action.payload;
            const index = state.items.findIndex(item => item.id === product.id);
            if (index >= 0) {
                state.items = state.items.filter(item => item.id !== product.id);
            }
            else {
                state.items = [...state.items, product];
            }
        }
    }
});
export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
