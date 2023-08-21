import React,{useState} from "react";
import './home.css'
import '../reusable.css'
import Headercom from "../header/header";
import Footercom from "../footer/footer";

export default function Homecom(){


    return(
        <div className="homecontain" id="home">
            <Headercom/>
            <>hola soy la pagina home, como estas el dia de hoy???</>
            <Footercom/>
        </div>
    )

}