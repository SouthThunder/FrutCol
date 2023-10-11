import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./shoppingCart.css";
import jwt_decode from "jwt-decode";
import { Toaster, toast } from "sonner";

export const ShoppingCart = ({ visibility, changeCartVis, lProductos, headers, prodsPool }) => {
  const [active, setActive] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalp, setTotalp] = useState(0);
  const [test2, setTest2] = useState(false);
  const menuRef = useRef();

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    
    let handler = (e) =>{
      if(menuRef.current !== null){
        if(!menuRef.current.contains(e.target)){
          setActive(false)
        }
      }
    }
    document.addEventListener('mousedown', handler)
    chkVis();

    const totalpruductos = lProductos.reduce((accumulator, prods) => {
      if (prods.cantidad > 0) {
        return (accumulator + prods.cantidad);
      }
      return accumulator;
    }, 0);
    const totalPrice = lProductos.reduce((accumulator, prods) => {
      if (prods.cantidad > 0) {
        return accumulator + prods.cantidad * prods.precio;
      }
      return accumulator;
    }, 0);
    // Actualiza el estado total con el nuevo precio total calculado
    console.log(totalpruductos)
    setTotal(totalPrice);
    setTotalp(totalpruductos);
  }, [visibility, lProductos, active, test2]);


  const handleReserve = async () => {
    const id_h = jwt_decode(localStorage.getItem("token"));
    const URIR = "https://frutcol-backend.onrender.com/reserva";
    const URIRP = "https://frutcol-backend.onrender.com/reserprod";
    const URI = "https://frutcol-backend.onrender.com/carrito/mod";
    if (totalp > 0) {
      try {
        const testing = await axios.post(
          URIR,
          {
            id_usuario: id_h.id_usuario,
            num_productos_reserva: totalp,
            valor_reserva: total,
            fecha_reserva: new Date().toISOString().slice(0, 10),
          },
          { headers }
        );
        lProductos.map(async (prod) => {
          if (prod.cantidad > 0) {
            await axios.post(
              URIRP,
              {
                num_orden: testing.data,
                id_producto: prod.id,
                cantidad_producto: prod.cantidad,
              },
              {
                headers,
              }
            );

            await axios.put(
              URI,
              {
                id_carrito: id_h.id_usuario,
                id_producto: prod.id,
                cantidad_producto: 0,
              },
              {
                headers,
              }
            );
          }
        });
        toast.success("La reserva ha sido creada");
        await new Promise((resolve) => setTimeout(resolve, 2500)); // Esperar 1 segundo
        refreshPage();
      } catch (error) {
        toast.error("Ha ocurrido un error creando la reserva");
        console.error(error);
      }
    } else {
      toast.error("Agrega productos al carrito antes de reservar");
    }
  };

  const handleResCantidad = (element) => {
      element.delProd(headers);
      setTest2(!test2);
  };

  const chkVis = () => {
    if (visibility === null || visibility === undefined) {
      setActive(false);
    } else {
      setActive(visibility);
    }
  };

  return (
        <div className={`shoppingCart ${active? 'active' : 'inactive'}`} ref={menuRef}>
          <div className="top">
            <button onClick={() => changeCartVis(!active)}>
              <img src="../../images/x.png" alt="X" />
            </button>
          </div>
          <div className="body">
            <div className="elements">
              {totalp > 0 ? (
                lProductos.map((prods) => {
                  const matchingProduct = prodsPool.find(
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
                          <button onClick={() => handleResCantidad(prods)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="noprod">
                  <img
                    className="emptycar"
                    src="../../images/cesta-compra (1)/37459.jpg"
                    alt="No hay productos"
                  />
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
  );
};
