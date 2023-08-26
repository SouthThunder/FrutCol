import React from "react";
import "./header.css";
import { Navigate, useNavigate } from "react-router-dom";

export const Headercom = () => {
  const navigate=useNavigate();
  const logIn = () =>{
    navigate("/Ingreso")
  }
  const signUp = () =>{
    navigate("/Registro")
  }

  return (
    <div className="header">
      <nav className="nav-bar">
        <a href="/" className="nav__logo">
          <img src="images/Frame 1.png" alt="" />
          <p>FrutCol-A</p>
        </a>
        <div className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item">
              <button className="nav__link" onClick={signUp}>Registrarse</button>
            </li>
            <li className="nav__item">
              <button className="nav__link" onClick={logIn}>Iniciar sesión</button>
            </li>
            <li className="nav__item">
              <img src="images/carrito.png" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
