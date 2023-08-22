import React,{useState} from "react";
import './carrito.css'
import {Headercom} from "../header/header";
import {Footercom} from "../footer/footer";

export const Carritocom=()=>{


    return(
        <div className="carritocontain" id="home">
            <Headercom/>
            <p>hola soy el carrito</p>
            <Footercom/>
        </div>
    )

}
