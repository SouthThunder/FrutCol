import React,{useState} from "react";
import './registro.css'
import {Link, parsePath} from 'react-router-dom';
import {Headercom} from "../header/header";
import {Footercom} from "../footer/footer";

export const  Registrocom=()=>{

    const handleSubmit = (event) => {
        event.preventDefault();

        const nombre = event.target.nombre.value;
        const apellido = event.target.apellido.value;
        const cedula = event.target.cedula.value;
        const contrasena = event.target.contrasena.value;

        // Validaciones para nombres y apellidos
        const namePattern = /^[A-Za-zÁ-ÿ\s]+$/; // Solo letras y espacios
        if (!namePattern.test(nombre) || !namePattern.test(apellido)) {
            alert('Los nombres y apellidos solo pueden contener letras y espacios.');
            return;
        }

        // Validación para cédula
        const cedulaPattern = /^\d+$/; // Solo números
        if (!cedulaPattern.test(cedula)) {
            alert('La cédula debe contener solo números.');
            return;
        }

        // Validación para contraseña
        const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).+$/; // Al menos un número y una mayúscula
        if (!passwordPattern.test(contrasena)) {
            alert('La contraseña debe contener al menos un número y una mayúscula.');
            return;
        }

        // Queda por enviar 
        alert('Registro exitoso!');
    }

    return(
        <div className="registrocontain" id="home">

            <div className="contderform">
                
                <h1>Registro</h1><br />

                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required /><br /> 

                    <label htmlFor="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required /><br />

                    <label htmlFor="cedula">Cédula:</label>
                    <input type="text" id="cedula" name="cedula" required /><br />

                    <label htmlFor="Direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" required /><br />

                    <label htmlFor="correo">Correo:</label>
                    <input type="email" id="correo" name="correo" required /><br />

                    <label htmlFor="contrasena">Contraseña:</label>
                    <input type="password" id="contrasena" name="contrasena" required /><br /> 

                    

                    <button type="submit">Registrarse</button>
                </form>
            </div>

            <div className="contizform">
                <h1>¿Ya tienes cuenta?</h1>
                <p>Si es así inicia sesión con nosotros</p><br /><br /><br />
                
                <Link to={'/Ingreso'}><button className="botonizform">Iniciar sesión</button></Link>

            </div>
            
        </div>
    )

}