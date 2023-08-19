import React,{useState} from "react";
import './quienes_somos.css'
import Headercom from "../header/header";
import Footercom from "../footer/footer";

export default function QuienesSomoscom(){


    return(
        <div className="QuienesSomoscontain" id="home">
            <Headercom/>
            <p>hola soy quienes somos</p>
            <Footercom/>
        </div>
    )

}