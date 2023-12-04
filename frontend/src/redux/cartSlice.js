import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    cart: []
};

if(localStorage.getItem('cart')){
    initialState.cart = JSON.parse(localStorage.getItem('cart'));
}else{
    initialState.cart = [];
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price, quantity, image } = action.payload;
            const item = state.cart.find(item => item.id === id);
            if(item){
                item.quantity += quantity;
            }else{
                state.cart.push({id, name, price, quantity, image});
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart: (state, action) => {
            const { id } = action.payload;
            state.cart = state.cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateCart: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cart.find(item => item.id === id);
            if(item){
                item.quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
}); 

export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;