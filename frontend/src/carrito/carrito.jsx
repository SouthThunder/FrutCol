import React, { useEffect, useState } from "react";
import "./carrito.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";

export const Card = ({prods}) => {
  const [reloader, setReloader] = useState(false)
  useEffect(() => {

  }, [reloader])

  const formatPrice = (price) => {
    return price.toLocaleString("en-US"); 
  }
  return(
    <div className="card" key={prods.id_producto}>
    <div className="name">
      <p>{prods.nombre}</p>
    </div>
    <div className="pImg">
      <img
        src={"../../images/" + prods.image}
        alt={prods.nombre_producto}
      />
    </div>
      <div className="price">
        <p>$ {formatPrice(prods.precio)}</p>
      </div>
      <div className="quantity">
          <p>{prods.cantidad}</p>
      </div>
      <div className="subtotal">
          <p>$ {formatPrice(((prods.precio) * prods.cantidad))}</p>
      </div>
      <button>X</button>
    {/* <div className="delete_prod">
      <button
        //</div>disabled={isComponentDisabled}
        onClick={() => {
          // handleResCantidad(prods)
          // updateLProducts(prods)
        }}
      >
        Eliminar
      </button>
    </div> */}
  </div>
  )
}

export const Cart = ({ lProductos }) => {
  const [total, setTotal] = useState(0);
  const [totalp, setTotalp] = useState(0);

  useEffect(() => {
    const totalpruductos = lProductos.reduce((accumulator, prods) => {
      if (prods.cantidad > 0) {
        return accumulator + prods.cantidad;
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
    setTotal(totalPrice);
    setTotalp(totalpruductos);
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString("en-US"); 
  }

  return (
    <div className="cartComp">
      <div className="title">
        <h1>Carrito</h1>
      </div>
      <div className="info">
        <div className="items">
          <div className="elements">
            <div className="labels">
              <h3>Producto</h3>
              <h3>Precio</h3>
              <h3>Cantidad</h3>
              <h3>Subtotal</h3>
              <span></span>
            </div>
            {totalp > 0 ? (
              lProductos.map((prods) => {
                if (prods.cantidad > 0) {
                  return (
                    <Card prods={prods} key={prods.id_producto}/>
                  );
                }
              })
            ) : (
              <div className="noprod">
                <img
                  className="emptycar"
                  src="../../images/37459.jpg"
                  alt="No hay productos"
                />
                <h5>Carrito vacío</h5>
              </div>
            )}
          </div>
        </div>
        <div className="checkout">
          <div className="top">
            <div className="row">
            <th>SubTotal:</th>
            <p>$ {formatPrice(total)}</p>
            </div>
            <div className="row">
            <th>IVA:</th>
            <p>0%</p>
            </div>
            <span className="separator"></span>
            <div className="row">
            <th>Total:  </th>
            <p>$ {formatPrice((total + total*0))}</p>
            </div>
          </div>
          <div className="bottom">
            <button>Reservar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Carritocom = ({ product, lProductos }) => {
  useEffect(() => {}, []);
  return (
    <div className="carritocontain">
      <Headercom product={product} />
      <Cart lProductos={lProductos} />
      <Footercom product={product} />
    </div>
  );
};
