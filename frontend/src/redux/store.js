import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
});