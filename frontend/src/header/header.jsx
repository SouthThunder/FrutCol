import React from "react";
import './header.css'

export default function Headercom(){

    return(
        <div className="header">
           
           <nav className="nav container">
           <a href="#" className="nav__logo">
                <img src="images/Frame 1.png" alt="" />
           </a>
           <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
                <li className="nav__item inicios">
                    <a href="" className="nav__link"id="inicios">Iniciar Sesión</a>
                </li>
                <li className="nav__item">
                    <a href="" className="nav__link">Registrarse</a>
                </li>
                <li className="nav__item">
                    <img src="images/carrito.png" alt="" />
                </li>
            </ul>
           </div>
           </nav>
        </div>

    )   
}