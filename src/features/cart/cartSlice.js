import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
    reducers: {
    addToCart: (state, action) => {
        const product = action.payload;
        const exestingItem = state.items.find(item=> item.id === product.id);
        if(exestingItem){
            exestingItem.quantity += 1;

        }else{
            state.items.push({...product, quantity: 1});
        } 

    },
    removeFromCart: (state,action) => {
        state.items =state.items.filter(item=> item.id !== action.payload);
    },
    clearCart: (state) => {
        state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;