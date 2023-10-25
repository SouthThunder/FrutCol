import React, { useEffect, useState } from "react";
import "./carrito.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import jwt_decode from "jwt-decode";
import { Toaster, toast } from "sonner";
import axios from "axios";

export const Card = ({ prods, updateReloader }) => {
  const [reloader, setReloader] = useState(false);
  const headers = {
    Authorization: `${localStorage.getItem("token")}`, // Agrega "Bearer" antes del token si es necesario
  };
  useEffect(() => {}, [reloader]);

  const handleResCantidad = () => {
    if (prods.cantidad === 1) {
      prods.delProd(headers);
      fatherReloader();
      setReloader(!reloader);
    } else {
      prods.resCantidad(headers);
      fatherReloader();
      setReloader(!reloader);
    }
  };

  const handleSumCantidad = () => {
    prods.sumCantidad(headers);
    fatherReloader();
    setReloader(!reloader);
  };

  const handleDelete = () => {
    prods.delProd(headers);
    fatherReloader();
    setReloader(!reloader);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-US");
  };

  const fatherReloader = () => {
    updateReloader();
  };

  return (
    <div className="card" key={prods.id}>
      <div className="name">
        <p>{prods.nombre}</p>
      </div>
      <div className="info">
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
          <div className="panel">
            <button onClick={() => handleResCantidad()}>-</button>
            <p>{prods.cantidad}</p>
            <button onClick={() => handleSumCantidad()}>+</button>
          </div>
        </div>
        <div className="subtotal">
          <p>$ {formatPrice(prods.precio * prods.cantidad)}</p>
        </div>
        <button onClick={() => handleDelete()}>X</button>
      </div>
    </div>
  );
};

export const Cart = ({ lProductos }) => {
  const [total, setTotal] = useState(0);
  const [totalp, setTotalp] = useState(0);
  const [reloader, setReloader] = useState(false);
  const [weight, setWeight] = useState(0);
  const [indicator, setIndicator] = useState([]);
  const [promt, setPromt] = useState([]);
  const [isComponentDisabled, setComponentDisabled] = useState(false);

  const headers = {
    Authorization: `${localStorage.getItem("token")}`, // Agrega "Bearer" antes del token si es necesario
  };

  useEffect(() => {
    // Calcula el número total de productos en el carrito
    const totalpruductos = lProductos.map((prods) => {
      return prods.reduce((accumulator, sub) => {
        if (sub.cantidad > 0) {
          return accumulator + sub.cantidad;
        } else {
          return accumulator;
        }
      }, 0);
    });
    const totalProductos = totalpruductos.reduce((accumulator, prods) => {
      return accumulator + prods;
    });

    // Calcula el precio total de los productos en el carrito
    const totalprice = lProductos.map((prods) => {
      return prods.reduce((accumulator, sub) => {
        if (sub.cantidad > 0) {
          return accumulator + sub.cantidad * sub.precio;
        }
        return accumulator;
      }, 0);
    });
    const totalPrice = totalprice.reduce((accumulator, prods) => {
      return accumulator + prods;
    });

    // Calcula el peso total de los productos en el carrito

    const totalweight = lProductos.map((prods) => {
      return prods.reduce((accumulator, sub) => {
        if (sub.cantidad > 0) {
          return accumulator + (sub.peso / 1000) * sub.cantidad;
        }
        return accumulator;
      }, 0);
    });

    const totalWeight = totalweight.reduce((accumulator, prods) => {
      return accumulator + prods;
    });

    if (totalWeight >= 5) {
      setComponentDisabled(false);
      setIndicator("green");
      setPromt("Todo listo para reservar!");
    } else {
      setComponentDisabled(true);
      setIndicator("orange");
      setPromt("Pedido mínimo: 5Kg");
    }
    // Actualiza el estado total con el nuevo precio total calculado
    setTotal(totalPrice);
    setTotalp(totalProductos);
    setWeight(totalWeight);
  }, [reloader]);

  const formatPrice = (price) => {
    const formattedNumber = price.toFixed(2);
    const parts = formattedNumber.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const updateReloader = () => {
    setReloader(!reloader);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const openPopup = () => {
    const popup = document.getElementById("popup");
    if (popup) {
      popup.style.visibility = "visible";
      popup.style.transform = "translate(-50%, -50%) scale(1)";
    }
  };

  const closePopup = () => {
    const popup = document.getElementById("popup");
    if (popup) {
      popup.style.visibility = "hidden";
      popup.style.transform = "translate(-50%, -50%) scale(0.1)";
    }
    refreshPage();
  };

  const handleReserve = async () => {
    const id_h = jwt_decode(localStorage.getItem("token"));

    setComponentDisabled(true);

    const URIR = "https://frutcol-backend-r3lq.onrender.com/reserva";
    const URIRP = "https://frutcol-backend-r3lq.onrender.com/reserprod";
    const URI = "https://frutcol-backend-r3lq.onrender.com/carrito/mod";
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
        lProductos.map((prod) => {
          prod.map(async (sub) => {
            if (sub.cantidad > 0) {
              await axios.post(
                URIRP,
                {
                  num_orden: testing.data,
                  id_producto: sub.id,
                  cantidad_producto: sub.cantidad,
                },
                {
                  headers,
                }
              );

              await axios.put(
                URI,
                {
                  id_carrito: id_h.id_usuario,
                  id_producto: sub.id,
                  cantidad_producto: 0,
                },
                {
                  headers,
                }
              );
            }
          });
        });
        toast.success("La reserva ha sido creada");

        await new Promise((resolve) => setTimeout(resolve, 2500)); // Esperar 1 segundo
        openPopup();
      } catch (error) {
        toast.error("Ha ocurrido un error creando la reserva");
        console.error(error);
      }
    } else {
      toast.error("Agrega productos al carrito antes de reservar");
    }
  };

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
                return prods.map((sub) => {
                  if (sub.cantidad > 0) {
                    return (
                      <Card
                        prods={sub}
                        updateReloader={updateReloader}
                        key={sub.id_producto}
                      />
                    );
                  }
                });
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
              <th>SubTotal ({totalp}):</th>
              <p>$ {formatPrice(total / 1.19)}</p>
            </div>
            <div className="row">
              <th>IVA:</th>
              <p>$ {formatPrice(total - total / 1.19)}</p>
            </div>
            <div className="progress">
              <p>{weight} Kg</p>
              <input
                type="range"
                min={0}
                max={100}
                value={weight}
                disabled
                style={{ backgroundSize: `${weight}% 100%` }}
              ></input>
              <p>100Kg</p>
            </div>
            <div className="indicator">
              <p style={{ color: indicator }}>{promt}</p>
            </div>
            <span className="separator"></span>
            <div className="row">
              <th>Total: </th>
              <p>$ {formatPrice(total + total * 0)}</p>
            </div>
          </div>
          <div className="bottom">
            <button
              onClick={() => handleReserve()}
              disabled={isComponentDisabled}
            >
              Reservar
            </button>
            <div className="toast2" id="popup">
              <h2>Pasos para hacer efectiva la reserva:</h2>
              <div className="pasos">
                <p>
                  1. Realice el pago del valor del pedido a Bancolombia cuenta
                  de Ahorros No. 601-000041-89 NIT: 901733392-6.
                </p>
                <p>
                  2. Tome una foto o captura de pantalla del comprobante de la
                  transacción.
                </p>
                <p>
                  3. Envíe la foto del comprobante a WhatsApp al número
                  3174358995 junto con un mensaje en el que indique el número de
                  orden;Puede consultar a detalle las reservas en Ajustes
                  &#x2192; Historial de Reservas.
                </p>
              </div>
              <button type="button" onClick={closePopup}>
                OK
              </button>
            </div>
          </div>
          <Toaster richColors />
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
