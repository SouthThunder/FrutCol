import React, { useState } from "react";
import "./ingreso.css";
import { Link } from "react-router-dom";


export const Ingresocom = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        <form>
          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" name="correo" required />
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
