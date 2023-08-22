import React,{useState} from "react";
import './home.css'
import {Headercom} from "../header/header";
import {Footercom} from "../footer/footer";

export const Homecom=()=>{


    return(
        <div className="homecontain" id="home">
            <Headercom/>
            <Footercom/>
        </div>
    )

}