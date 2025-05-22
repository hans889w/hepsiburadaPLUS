import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity -= 1;
                if (existingItem.quantity <= 0) {
                    state.items = state.items.filter((item) => item.id !== action.payload);
                }
            }
        },
    },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
