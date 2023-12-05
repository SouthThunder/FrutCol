import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../../common/loading/LoadingSpinner.jsx";
import Cookie from "js-cookie";
import "./info_cuenta.css";
import { getResourceById } from "../../../services/reserProd.js";

export const ProductosReserva = (prop) => {

    const [products, setProducts] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const firstRender = useRef(true);
    
    const metadata = prop.prodsPool;
  
    useEffect(() => {
      if (firstRender.current) {
        console.log(prop.reservation.num_orden);
        getProducts();
        firstRender.current = false;
      } else {
        if (products !== null) {
          setisLoading(false);
        }
      }
    }, [products]);
  
    const getProducts = async () => {
      try {
        const res = await getResourceById(prop.reservation.num_orden, Cookie.get("token"));
        setProducts(res.data);
      } catch (error) {
        console.error("ERROR: " + error);
      }
    };
  
    if (isLoading) {
      return <LoadingSpinner />;
    }
  
    return (
      <div className="resprod">
        <h2>Número de orden: {prop.reservation.num_orden}</h2>
        <div className="elements">
          <div className="labels">
            <div className="lItem">
              <p>Producto</p>
            </div>
            <div className="lItem">
              <p>Cantidad</p>
            </div>
            <div className="lItem">
              <p>Valor</p>
            </div>
          </div>
          {products?.map((products) => {
            let matchingProduct = null;
            metadata.map((prod) => {
              return prod.SubMetadata_productos.map((sub) => {
                if (sub.id_subMetadata_producto === products.id_producto) {
                  matchingProduct = sub;
                }
              });
            });
            return (
              <div className="product" key={products.id_producto}>
                <div className="pImg">
                  <div className="title">
                    <h3>{matchingProduct.nombre_producto}</h3>
                  </div>
                  <picture>
                    <source
                      srcSet={
                        "../../images/" +
                        matchingProduct.image.split(".")[0] +
                        ".avif"
                      }
                      type="image/avif"
                    />
                    <source
                      srcSet={
                        "../../images/" +
                        matchingProduct.image.split(".")[0] +
                        ".webp"
                      }
                      type="image/webp"
                    />
                    <img
                      src={"../../images/" + matchingProduct.image}
                      alt={matchingProduct.nombre_producto}
                    />
                  </picture>
                </div>
                <div className="promt">
                  <p>Cantidad: {products.cantidad_producto}</p>
                </div>
                <div className="unit">
                  <p>$ {matchingProduct.precio_producto} c/u</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="separator"></div>
        <div className="total">
          <p>
            <strong>Total:</strong> {prop.reservation.valor_reserva}
          </p>
        </div>
      </div>
    );
  };

export const HistorialReservas = (prop) => {
    const handleReservationClick = (reserva) => {
      prop.onSelectOption("productosreserva");
      prop.onSelectReservation(reserva);
    };
    console.log(prop);
    useEffect(() => {}, []);
    return (
      <div className="historialReserva">
        <div className="container">
          <div className="labels">
            <div className="lItem">
              <p># Reserva</p>
            </div>
            <div className="lItem">
              <p>Número de productos </p>
            </div>
            <div className="lItem">
              <p>Fecha</p>
            </div>
            <div className="lItem">
              <p>Valor total</p>
            </div>
            <div className="lItem">
              <p>Estado</p>
            </div>
          </div>
          {prop.userHistory.map((userHistory) => {
            const chkStatus = () => {
              if (userHistory.estado_reserva === false) {
                return <li style={{ color: "#ff8c00" }}>En proceso</li>;
              } else {
                return <li style={{ color: "green" }}>Entregado</li>;
              }
            };
  
            return (
              <ul
                className="orders"
                key={userHistory.num_orden}
                onClick={() => handleReservationClick(userHistory)}
              >
                <div className="lItem">
                  <li>{userHistory.num_orden}</li>
                </div>
                <div className="lItem">
                  <li>{userHistory.num_productos_reserva}</li>
                </div>
                <div className="lItem">
                  <li>{userHistory.fecha_reserva}</li>
                </div>
                <div className="lItem">
                  <li>{userHistory.valor_reserva}</li>
                </div>
                <div className="lItem">
                  <li>{chkStatus()}</li>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
    );
  };