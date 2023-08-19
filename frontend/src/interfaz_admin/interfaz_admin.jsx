import React,{useState} from "react";
import './interfaz_admin.css'
import Headercom from "../header/header";
import Footercom from "../footer/footer";

export default function InterfazAdmincom(){


    return(
        <div className="interfazAdmincontain" id="home">
            <Headercom/>
            <p>hola soy el la interfaz de administracion</p>
            <Footercom/>
        </div>
    )

}