import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    id: "",
    name: "",
    lastname: "",
    email: "",
    sueldo: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            const { id_usuario, nombre_usuario, correo_usuario, apellido_usuario, sueldo_usuario } = action.payload;
            state.id = id_usuario;
            state.name = nombre_usuario;
            state.lastname = apellido_usuario;
            state.email = correo_usuario;
            state.sueldo = sueldo_usuario;
        },
        logout: (state) => {
            state.id = "";
            state.name = "";
            state.lastname = "";
            state.email = "";
            state.sueldo = "";
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;