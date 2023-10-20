import React,{useState} from "react";
import './carrito.css'
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";

export const Carritocom = ({product}) =>{
    return(
        <div className="carritocontain" id="home">
            <Headercom product={product}/>
            <p>hola soy el carrito</p>
            <Footercom product={product}/>
        </div>
    )

}
