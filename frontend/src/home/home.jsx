import React,{useState} from "react";
import './home.css'
import {Headercom} from "../header/header";
import {Footercom} from "../footer/footer";

export const Slider=()=>{
    return(
        <div className="slider">
            <div className="first">
                <div className="n1">
                    <h1>Insert Item Name</h1>
                </div>
                <div className="n2">
                    <h1>Promt</h1>
                </div>
                <div className="n3">
                    <button>
                        + Add to Cart
                    </button>
                </div>
                <div className="n4">
                    <h1>Slider</h1>
                </div>
            </div>


            <div className="second">

            </div>


            <div className="third">
                <div className="n1">
                    <h1>Insert Slogan</h1>
                </div>
                <div className="n2">
                    <button>
                        <p> L </p>
                    </button>
                    <button>
                        <p> R </p>
                    </button>
                </div>
                <div className="n3"></div>
            </div>
        </div>
    );
}

export const Homecom=()=>{


    return(
        <div className="homecontain" id="home">
            <Headercom/>
                <Slider/>
            <Footercom/>
        </div>
    )

}