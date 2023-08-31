import React, { useEffect, useState } from "react";
import "./ingreso.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const URI = 'https://frutcola-backendpru.onrender.com/usuarios/login';


export const Ingresocom = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [localuser, setLocalUser] =useState([]);
  const [localpassword, setlocalPassword] =useState([]);
  const navigate= useNavigate();

  useEffect(()=>{

  },[])

  const test= async() => {
    console.log('validating...')
    try {
      const res = await axios.post(URI,
        {
          correo_usuario: localuser,
          contrasena_usuario: localpassword
        });
      localStorage.setItem('token', res.data.token);
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="ingresocontain" id="home">
      <div className="contizformlogin">
        <h1>¿Eres nuevo?</h1>
        <p>Se parte de FrutColA</p>
        <br />
        <br />
        <br />
        <Link to={"/Registro"}>
          <button className="botonizform">Registrarse</button>
        </Link>
      </div>
      <div className="contderformlogin">
        <h1>Inicio de sesión</h1>
        <br />
        <p className="separadorform"></p>
          <form action={test}>
          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" name="correo" required onChange={(e)=> setLocalUser(e.target.value)}/>
          <br />
          <br />
          <br />
          <br />
          <br />
          <label htmlFor="contrasena">Contraseña:</label>
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              id="contrasena"
              name="contrasena"
              required
              onChange={(e)=> setlocalPassword(e.target.value)}
            />
            <br />
            <br />
            <br />
            <button
              className="invisible"
              type="button"
              onClick={togglePasswordVisibility}
            >
              <img
                src={showPassword ? "images/ojo.png" : "images/invisible.png"}
                alt={showPassword ? "visible" : "invisible"}
              />
            </button>
          </div>
          <button className="enviar" type="submit">
            Iniciar sesión
          </button>
          </form>
      </div>
    </div>
  );
};
