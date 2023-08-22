import React,{useState} from "react";
import './ingreso.css'
import Headercom from "../header/header";
import Footercom from "../footer/footer";

export default function Ingresocom(){


    return(
        <div className="ingresocontain" id="home">
            <Headercom/>
            <p>hola soy el ingreso</p>
            <Footercom/>
        </div>
    )

}