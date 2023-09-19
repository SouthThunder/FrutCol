import React,{useEffect, useState} from "react";
import './carrito.css'
import {Headercom} from "../header/header";
import {Footercom} from "../footer/footer";
import { Products } from "../home/home";


export const CartComp= () =>{
    const [items, setItems] = useState([JSON.parse(localStorage.getItem('carrito'))]);
    const [test, setTest] = useState({
        producto: [],
      });
      const [fuck, setFuck] = useState([])
    useEffect(()=>{
        readItems();
    }, [test]);

    const handleResCantidad = (producto) => {
        const updatedProductos = test.producto.map((prod) => {
          if (prod.nombre === producto.nombre_producto) {
            prod.resCantidad();
          }
          return prod;
        });
        setTest({ producto: updatedProductos });
      };
    
      const handleSumCantidad = (producto) => {
        const updatedProductos = test.producto.map((prod) => {
          if (prod.nombre === producto.nombre_producto) {
            prod.sumCantidad();
          }
          return prod;
        });
        setTest({ producto: updatedProductos });
      };

    const readItems= () =>{
        let arr = [];
        items[0].map((producto) =>{
            if(producto.cantidad > 0){
                arr.push(producto)
            }
        })
        setFuck(arr[0])
        console.log(fuck)
    }

    return(
        <div className="cartComp">
            <div className="cartContainer">
                <div className="itemsList">
                    {
                    items.map((prods)=> (
                        <div className="card" key={prods.id_producto}>
                                  <div className="title">
                                    <div className="promt">
                                      <p>{prods.nombre_producto}</p>
                                    </div>
                                    <div className="unit">
                                      <div className="container">
                                        <p>$ {prods.precio_producto} c/u</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pImg">
                                    <img
                                      src={"../../images/" + prods.img_producto}
                                      alt={prods.nombre_producto}
                                    />
                                  </div>
                                  <div className="controls">
                                    <div className="panel">
                                      <button onClick={() => handleResCantidad(prods)}>-</button>
                                      <p>
                                        {
                                          test.producto.find(
                                            (prod) => prod.nombre === prods.nombre_producto
                                          )?.cantidad
                                        }
                                      </p>
                                      <button onClick={() => handleSumCantidad(prods)}>+</button>
                                    </div>
                                    <div className="value">
                                      <p>
                                        ${" "}
                                        {test.producto
                                          .find((prod) => prod.nombre === prods.nombre_producto)
                                          ?.calcularPrecioTotal()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                    )

                    )
                    }
                </div>
                <div className="info">

                </div>
            </div>
            <Products promt={'Olvidaste algo?'}/>
        </div>
    );
}

export const Carritocom=({product})=>{
    return(
        <div className="carritocontain">
            <Headercom prod={product}/>
            <CartComp/>
            <Footercom prod={product}/>
        </div>
    )

}
