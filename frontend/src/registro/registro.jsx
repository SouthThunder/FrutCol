import React,{useState} from "react";
import './registro.css'
import Headercom from "../header/header";
import Footercom from "../footer/footer";

export default function Registrocom(){


    return(
        <div className="registrocontain" id="home">
            <Headercom/>
            <p>hola soy registro</p>
            <Footercom/>
        </div>
    )

}