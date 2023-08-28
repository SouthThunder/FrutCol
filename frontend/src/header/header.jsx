import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

export const Headercom = (props) => {
  const navigate=useNavigate();
  const logIn = () =>{
    navigate("/Ingreso")
  }
  const signUp = () =>{
    navigate("/Registro")
  }
  return (
    <div className="header">
      <nav className="nav-bar" style={{backgroundColor: props.prod.headerColor, transition: 'all 1s var(--btn-cubic-bezier)'}}>
        <a href="/" className="nav__logo">
          <img src="images/Frame 1.png" alt="" />
          <p style={{color: props.prod.fontColor , transition: 'all 1s var(--btn-cubic-bezier)'}}>FrutCol-A</p>
        </a>
        <div className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item">
              <button className="nav__link" onClick={signUp} style={{backgroundColor: props.prod.mainColor , transition: 'all 1s var(--btn-cubic-bezier)'}}>Registrarse</button>
            </li>
            <li className="nav__item">
              <button className="nav__link" onClick={logIn} style={{color: props.prod.fontColor , transition: 'all 1s var(--btn-cubic-bezier)'}}>Iniciar sesión</button>
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
