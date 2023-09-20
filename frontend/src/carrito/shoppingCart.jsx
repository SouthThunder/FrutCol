import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './shoppingCart.css'
import { Producto } from "../home/cartSlice";
import jwt_decode from "jwt-decode";
import { Toaster, toast } from 'sonner';
import { Link, useNavigate } from "react-router-dom";

export const ShoppingCart = ({ visibility, changeCartVis}) => {
  const [active, setActive] = useState([]);
   const URI = "https://frutcola-backendpru.onrender.com/metadata";
   const [products, setProducts] = useState([]);
   const [total,setTotal]=useState(0);
   const [totalp,setTotalp]=useState(0);
   const [test, setTest] = useState({
    producto: [],
  });
  const refreshPage = () => {
    window.location.reload();
  };
  const accessToken= localStorage.getItem("token");
  const headers = {
    Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
  };
  useEffect(() => {
    chkVis();
     
  }, [visibility]);
  useEffect(() => {
    
     getProducts();
  }, [test.producto]);
  
  const handleDelete = async (id) =>{
    const URI= `https://frutcola-backendpru.onrender.com/productos/${id}`;
    await axios.delete(URI, {
        headers,
      });
      
  }
  const id_h= jwt_decode(localStorage.getItem('token'))
  
  const handleReserve = async () =>{
    const URIR='https://frutcola-backendpru.onrender.com/reserva';
    const URIC= `https://frutcola-backendpru.onrender.com/carrito/${id_h.id_usuario}`;
    if(totalp>0){
    try {
      await axios.post(URIR, {
       id_usuario:id_h.id_usuario,
       num_productos_reserva: totalp,
       valor_reserva:total,
       fecha_reserva: new Date().toISOString().slice(0, 10),
      }, {headers});
      await axios.delete(URIC, {headers});
      
      toast.success('La reserva ha sido creada');
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Esperar 1 segundo 
      refreshPage();

    } catch (error) {
      toast.error('Ha ocurrido un error creando la reserva');
      console.error(error);
    }}else{
      toast.error('Agrega productos al carrito antes de reservar');
    }
  };

   const getProducts = async () => {
    const id_carrito= jwt_decode(localStorage.getItem('token'))
    const idk= `https://frutcola-backendpru.onrender.com/carrito/${id_carrito.id_usuario}`;
    
    try {
      
      const res = await axios.get(URI);
      const res2 = await axios.get(idk,{headers});
      setProducts(res.data);
      setTest({
        producto: res.data.map(
          (prod) =>{
            const it= res2.data.find((lproduc)=> lproduc.id_producto === prod.id_metadata_producto)
            if(it===undefined){
              return new Producto(prod.id_metadata_producto, prod.nombre_producto, prod.precio_producto, 0)
            }else{
              return new Producto(it.id_producto, prod.nombre_producto, prod.precio_producto, it.cantidad_producto)
            }
            
          } 
        ),
      });
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  useEffect(() => {
    // Calcula el precio total sumando el precio de cada producto multiplicado por la cantidad
    const totalpruductos= test.producto.reduce(
      (accumulator, prods) => {
        if (prods.cantidad > 0) {
          return accumulator+=prods.cantidad;
        }
        return accumulator;
      },
      0
    );
    const totalPrice = test.producto.reduce(
      (accumulator, prods) => {
        if (prods.cantidad > 0 ) {
          return accumulator + prods.cantidad * prods.precio;
        }
        return accumulator;
      },
      0
    );
    // Actualiza el estado total con el nuevo precio total calculado
    setTotal(totalPrice);
    setTotalp(totalpruductos);
  }, [active]);

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
            <button onClick={() => changeCartVis(!active)}>
              <img src="../../images/x.png" alt="X" />
            </button>
          </div>
          <div className="body">
            <div className="elements">
              {totalp > 0 ? (
                test.producto?.map((prods) => {
                  const matchingProduct = products.find(
                    (prod) => prod.nombre_producto === prods.nombre
                  );
  
                  if (prods.cantidad > 0) {
                    return (
                      <div className="card" key={prods.id_producto}>
                        <div className="pImg">
                          <img
                            src={"../../images/" + matchingProduct.image}
                            alt={matchingProduct.nombre_producto}
                          />
                        </div>
                        <div className="title">
                          <div className="promt">
                            <h3>{matchingProduct.nombre_producto}</h3>
                            <p>Cantidad: {prods.cantidad}</p>
                          </div>
                          <div className="unit">
                            <div className="container">
                              <p>$ {matchingProduct.precio_producto} c/u</p>
                            </div>
                          </div>
                        </div>
                        <div className="delete_prod">
                          <button onClick={() => handleDelete(prods.id)}>Eliminar</button>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="noprod">
                  <img className="emptycar" src="../../images/cesta-compra (1)/37459.jpg" alt="No hay productos" />
                  <h5>Carrito vacío</h5>
                </div>
              )}
            </div>
          </div>
  
          <div className="bottom">
            <p>Total: $ {total}</p>
            <button onClick={() => handleReserve()}>Reservar</button>
          </div>
          <Toaster richColors />
        </div>
      )}
    </div>
  );
  
};
