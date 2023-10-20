import React,{useState} from "react";
import './carrito.css'
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";

export const Cart = ({}) =>{
    return(
        <div className="cartComp">
            <div className="items">
                <div className="title">
                    <h1>Carrito</h1>
                </div>
                <div className="elements">

                </div>
            </div>
            <div className="checkout">
                <p>Checkout</p>
            </div>
        </div>
    )
}

export const Carritocom = ({product}) =>{
    return(
        <div className="carritocontain" id="home">
            <Headercom product={product}/>
            <Cart/>
            <Footercom product={product}/>
        </div>
    )

}
