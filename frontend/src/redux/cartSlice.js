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
            const { id_producto, nombre_producto, precio_producto, cantidad_producto, image } = action.payload;
            const item = state.cart.find(item => item.id_producto === id_producto);
            if(item){
                item.cantidad_producto += cantidad_producto;
            }else{
                state.cart.push({id_producto, nombre_producto, precio_producto, cantidad_producto, image});
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart: (state, action) => {
            const { id_producto } = action.payload;
            state.cart = state.cart.filter(item => item.id_producto !== id_producto);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateCart: (state, action) => {
            const { id_producto, cantidad_producto } = action.payload;
            const item = state.cart.find(item => item.id_producto === id_producto);
            if(item){
                item.cantidad_producto = cantidad_producto;
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