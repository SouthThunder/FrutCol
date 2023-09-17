import React, { useState } from "react";
import "./registro.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode';


export const Registrocom = () => {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nombreError, setnombreError] = useState("");
  const [nombreInputClass, setnombreInputClass] = useState("");
  const [apellidoInputClass, setapellidoInputClass] = useState("");
  const [apellidoError, setapellidoError] = useState("");
  const [cedulaInputClass, setcedulaInputClass] = useState("");
  const [cedulaError, setcedulaError] = useState("");
  const [direccionInputClass, setdireccionInputClass] = useState("");
  const [direccionError, setdireccionError] = useState("");
  const [correoInputClass, setcorreoInputClass] = useState("");
  const [correoError, setcorreoError] = useState("");
  const [contrasenaInputClass, setcontrasenaInputClass] = useState("");
  const [contrasenaError, setcontrasenaError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {

    //validaciones de contenido
    //validacion de contenido nombre
    if (!nombre || nombre === undefined || nombre === '') {
      setnombreError("Ingrese su nombre");
      setnombreInputClass("shake");
      setTimeout(() => {
        setnombreInputClass("");
      }, 500);
      return;
    } else {
      setnombreError("");
      setnombreInputClass("");
    }

    //validacion de contenido apellido
    if (!apellido || apellido === undefined || apellido === '') {
      setapellidoError("Ingrese su apellido");
      setapellidoInputClass("shake");
      setTimeout(() => {
        setapellidoInputClass("");
      }, 500);
      return;
    } else {
      setapellidoError("");
      setapellidoInputClass("");
    }
    

    //validacion de contenido cedula
    if (!cedula || cedula === undefined || cedula === '') {
      setcedulaError("Ingrese su cedula");
      setcedulaInputClass("shake");
      setTimeout(() => {
        setcedulaInputClass("");
      }, 500);
      return;
    } else {
      setcedulaError("");
      setcedulaInputClass("");
    }

    //validacion de contenido direccion
    if (!direccion || direccion === undefined || direccion === '') {
      setdireccionError("Ingrese su dirección");
      setdireccionInputClass("shake");
      setTimeout(() => {
        setdireccionInputClass("");
      }, 500);
      return;
    } else {
      setdireccionError("");
      setdireccionInputClass("");
    }


    //validacion de contenido correo
    if (!correo || correo === undefined || correo === '') {
      setcorreoError("Ingrese su correo");
      setcorreoInputClass("shake");
      setTimeout(() => {
        setcorreoInputClass("");
      }, 500);
      return;
    } else {
      setcorreoError("");
      setcorreoInputClass("");
    }

    //validacion de contenido contrasena
    if (!contrasena || contrasena === undefined || contrasena === '') {
      setcontrasenaError("Ingrese su contraseña");
      setcontrasenaInputClass("shake");
      setTimeout(() => {
        setcontrasenaInputClass("");
      }, 500);
      return;
    } else {
      setcontrasenaError("");
      setcontrasenaInputClass("");
    }


    const URI = "https://frutcola-backendpru.onrender.com/usuarios/register";


    // Validaciones para nombres y apellidos
    const namePattern = /^[A-Za-zÁ-ÿ\s]+$/; // Solo letras y espacios

    if (!namePattern.test(nombre)) {
      setnombreError("Los nombres solo pueden contener letras y espacios");
      setnombreInputClass("shake");
      setTimeout(() => {
        setnombreInputClass("");
      }, 500);
      return;
    }else {
    setnombreError("");
    setnombreInputClass("");
    }

    if (!namePattern.test(apellido)) {
      setapellidoError("Losapellidos solo pueden contener letras y espacios");
      setapellidoInputClass("shake");
      setTimeout(() => {
        setapellidoInputClass("");
      }, 500);
      return;
    }else {
    setapellidoError("");
    setapellidoInputClass("");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(correo)) {
      setcorreoError("Ingrese un formato de correo valido");
      setcorreoInputClass("shake");
      setTimeout(() => {
        setcorreoInputClass("");
      }, 500);
      return;
    }else {
      setcorreoError("");
      setcorreoInputClass("");
    }



    // Validación para contraseña
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/; // Al menos un número, una mayúscula y 8 o más caracteres
    if (!passwordPattern.test(contrasena)) {
      setcontrasenaError("La contraseña debe contener al menos un número, una mayúscula y tener 8 o más caracteres");
      setcontrasenaInputClass("shake");
      setTimeout(() => {
        setcontrasenaInputClass("");
      }, 500);
      return;
    }else {
      setcontrasenaError("");
      setcontrasenaInputClass("");
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
      authToken()
      alert("Registro exitoso!");
    } catch (error) {
      console.error(error);
    }
  };

  const authToken = async() =>{
    try {
      const URI = "https://frutcola-backendpru.onrender.com/usuarios/login";
      const res = await axios.post(URI, {
        correo_usuario: correo,
        contrasena_usuario: contrasena,
      });
      localStorage.setItem("token", res.data.token);
      getId(res.data.token)
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  const getId = async(token) =>{
    const URI = "https://frutcola-backendpru.onrender.com/carrito/create";
    const headers = {
      Authorization: `${token}`, // Agrega "Bearer" antes del token si es necesario
    };
    try {
      const decode= jwt_decode(token);
      await axios.post(URI, {
        headers
      } , decode.id_usuario)
    } catch (error) {
      console.error(error)
    }
  }

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
          <p className={`error ${nombreInputClass}`}>{nombreError}</p>
          <br />

          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <p className={`error ${apellidoInputClass}`}>{apellidoError}</p>
          <br />

          <label htmlFor="cedula">Cédula:</label>
          <input
            type="number"
            id="cedula"
            name="cedula"
            inputMode="numeric"
            onChange={(e) => setCedula(e.target.value)}
            required
          />
          <p className={`error ${cedulaInputClass}`}>{cedulaError}</p>
          <br />

          <label htmlFor="Direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
          <p className={`error ${direccionInputClass}`}>{direccionError}</p>
          <br />

          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <p className={`error ${correoInputClass}`}>{correoError}</p>
          <br />

          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <p className={`error ${contrasenaInputClass}`}>{contrasenaError}</p>
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
