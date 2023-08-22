import React,{useState} from "react";
import './info_cuenta.css'
import {Headercom} from "../header/header";
import {Footercom} from "../footer/footer";

export const InfoCuentacom=()=>{


    return(
        <div className="infoCuentacontain" id="home">
            <Headercom/>
            <p>hola soy informacion de cuenta</p>
            <Footercom/>
        </div>
    )

}