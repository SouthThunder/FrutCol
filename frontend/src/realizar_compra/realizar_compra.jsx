import React,{useState} from "react";
import './realizar_compra.css'
import {Headercom} from "../header/header";
import {Footercom} from "../footer/footer";

export const RealizarCompracom=()=>{


    return(
        <div className="realizarComprascontain" id="home">
            <Headercom/>
            <p className="hola">hola soy realizar compra</p>
            <Footercom/>
        </div>
    )

}