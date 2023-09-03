import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './shoppingCart.css'

export const ShoppingCart = ({ visibility, changeCartVis}) => {
  const [active, setActive] = useState([]);

  useEffect(() => {
    chkVis();
  }, [visibility]);

  const chkVis = () => {
    if (visibility === null || visibility === undefined) {
      setActive(false);
    } else {
      setActive(visibility);
    }
  };


  return (
    <div>
      {active && (
        <div className="shoppingCart">
          <div className="top">
            <button onClick={()=> changeCartVis(!active)}>
                <img src="../../images/x.png" alt="X" />
            </button>
          </div>
          <div className="body">

          </div>
        </div>
      )}
    </div>
  )
};
