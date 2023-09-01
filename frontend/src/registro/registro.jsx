import React, { useState } from "react";
import "./registro.css";
import { Link, parsePath } from "react-router-dom";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import axios from "axios";

export const Registrocom = () => {
  const URI = "https://frutcola-backendpru.onrender.com/usuarios/register";

  const [nombre, setNombre] = useState([]);
  const [apellido, setApellido] = useState([]);
  const [cedula, setCedula] = useState([]);
  const [contrasena, setContrasena] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [direccion, setDireccion] = useState([]);

  const handleSubmit = async () => {
    // Validaciones para nombres y apellidos
    const namePattern = /^[A-Za-zÁ-ÿ\s]+$/; // Solo letras y espacios
    if (!namePattern.test(nombre) || !namePattern.test(apellido)) {
      alert("Los nombres y apellidos solo pueden contener letras y espacios.");
      return;
    }

    // Validación para cédula
    const cedulaPattern = /^\d+$/; // Solo números
    if (!cedulaPattern.test(cedula)) {
      alert("La cédula debe contener solo números.");
      return;
    }

    // Validación para contraseña
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/; // Al menos un número, una mayúscula y 8 o más caracteres
    if (!passwordPattern.test(contrasena)) {
      alert(
        "La contraseña debe contener al menos un número, una mayúscula y tener 8 o más caracteres."
      );
      return;
    }
    // Queda por enviar
    try {
      await axios.post(URI, {
        nombre_usuario: nombre,
        apellido_usuario: apellido,
        cedula_usuario: cedula,
        contrasena_usuario: contrasena,
        correo_usuario: correo,
        direccion_usuario: direccion,
      });
      alert("Registro exitoso!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registrocontain" id="home">
      <div className="contderform">
        <h1>Registro</h1>
        <br />

        <div className="form">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <br />

          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <br />

          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            onChange={(e) => setCedula(e.target.value)}
            required
          />
          <br />

          <label htmlFor="Direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
          <br />

          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <br />

          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <br />

          <button type="submit" onClick={handleSubmit}>
            Registrarse
          </button>
        </div>
      </div>

      <div className="contizform">
        <h1>¿Ya tienes cuenta?</h1>
        <p>Si es así inicia sesión con nosotros</p>
        <br />
        <br />
        <br />

        <Link to={"/Ingreso"}>
          <button className="botonizform">Iniciar sesión</button>
        </Link>
      </div>
    </div>
  );
};
