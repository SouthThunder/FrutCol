import React from "react";
import "./header.css";

export const Headercom = () => {
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
              <button className="nav__link">Registrarse</button>
            </li>
            <li className="nav__item">
              <button className="nav__link">Iniciar sesión</button>
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
