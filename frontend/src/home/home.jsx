import React, { useState, useEffect } from "react";
import "./slider.css";
import "./products.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";

export const Slider = () => {
  return (
    <div className="slider">
      <div className="first">
        <div className="n1">
          <h1>
            Pulpa de <br /> Fresa
          </h1>
        </div>
        <div className="n2">
          <h1>$ 9.000 c/u</h1>
        </div>
        <div className="n3">
          <button>+ Añadir al carrito</button>
        </div>
        <div className="n4">
          <p>01</p>
          <span></span>
          <p>05</p>
        </div>
      </div>

      <div className="second">
        <img src="../../images/stain fresa.png" alt="" />
        <img src="../../images/fresa.png" alt="" />
      </div>
      

      <div className="third">
        <div className="n1">
          <h1>Apasionante y Natural</h1>
          <h3>
            Pulpa de fruta 100% <div className="test">natural</div>
          </h3>
        </div>
        <div className="n2">
          <button>&#60;</button>
          <button>&#62;</button>
        </div>
        <div className="n3">
        <div className="products__preview">
        <button className="fruit">
          <div className="fruit__container">
              <img src="../../images/fresa.png" alt="" />
          </div>
        </button>
        <button className="fruit">
          <div className="fruit__container">
              <img src="../../images/guanabana.png" alt="" />
          </div>
        </button>
        <button className="fruit">
          <div className="fruit__container">
              <img src="../../images/mango.png" alt="" />
          </div>
        </button>
        <button className="fruit">
          <div className="fruit__container">
              <img src="../../images/maracuya.png" alt="" />
          </div>
        </button>
        <button className="fruit">
          <div className="fruit__container">
              <img src="../../images/mora.png" alt="" />
          </div>
        </button>
        
        </div>
        </div>
      </div>
    </div>
  );
};

export const Products = () => {
  const URI = 1;
  return (
    <div className="products">
      <div className="title">
        <h1>Productos</h1>
      </div>
      <div className="elements">
        <div className="card">
          <div className="title">
            <p>Test</p>
          </div>
          <div className="pImg">
            <img src="../../images/fresa.png" alt="" />
          </div>
          <div className="controls">
            <div className="panel">
              <button>-</button>
              <p>1</p>
              <button>+</button>
            </div>
            <div className="value">
              <p>Total Price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Homecom = () => {
  return (
    <div className="homecontain">
      <Headercom />
      <Slider />
      <Products />
      <Footercom />
    </div>
  );
};
