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
              <div className="container">
                <a href="" className="nav__link">
                  Registrarse
                </a>
              </div>
            </li>
            <li className="nav__item">
              <div className="container">
                <a href="" className="nav__link">
                  Iniciar Sesión
                </a>
              </div>
            </li>
            <li className="nav__item">
              <img src="images/carrito.png" alt="" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
