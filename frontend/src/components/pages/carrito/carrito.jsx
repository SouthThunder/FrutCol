import { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sumItemFromCart, restItemFromCart, clearItemFromCart } from "../../../redux/cartSlice";
import {
  getTotalItems,
  getTotalWeight,
  getTotalPrice,
  formatPrice,
  prodTotalPrice
} from "../../../utils/helpers";
import "./carrito.css";

export const Card = ({ prods }) => {
  const dispatch = useDispatch();

  return (
    <div className="card" key={prods.id_producto}>
      <div className="name">
        <p>{prods.nombre}</p>
      </div>
      <div className="info">
        <div className="pImg">
          <div className="pImg">
            <picture>
              <source
                srcSet={"../../images/" + prods.image.split(".")[0] + ".avif"}
                type="image/avif"
              />
              <source
                srcSet={"../../images/" + prods.image.split(".")[0] + ".webp"}
                type="image/webp"
              />
              <img
                src={"../../images/" + prods.image}
                alt={prods.nombre_producto}
              />
            </picture>
          </div>
        </div>
        <div className="price">
          <p>$ {formatPrice(prods.precio_producto)}</p>
        </div>
        <div className="quantity">
          <div className="panel">
            <button onClick={() => dispatch(restItemFromCart(prods))}>-</button>
            <p>{prods.cantidad_producto}</p>
            <button onClick={() => dispatch(sumItemFromCart(prods))}>+</button>
          </div>
        </div>
        <div className="subtotal">
          <p>$ {formatPrice(prodTotalPrice(prods))}</p>
        </div>
        <button onClick={() => dispatch(clearItemFromCart(prods))}>X</button>
      </div>
    </div>
  );
};

export const ReceiptInfo = ({
  lProductos,
  num_productos_reserva,
  valor_reserva,
  openPopup,
}) => {
  const firstLoad = useRef(true);
  const [localProds, setLocalProds] = useState([]);
  const [deActive, setDeActive] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    correo: "",
    cedula: "",
    direccionEnvio: "",
  });

  useEffect(() => {
    if (firstLoad.current) {
      lProductos.map((prods) => {
        return prods.map((sub) => {
          if (sub.cantidad > 0) {
            setLocalProds((pro) => [...pro, sub]);
          }
        });
      });
      firstLoad.current = false;
    }
  }, [localProds]);

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    const newErrors = {};

    // Validar campos obligatorios
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = "Este campo es obligatorio";
      }
    }

    // Validar correo electrónico
    if (formData.correo && !validateEmail(formData.correo)) {
      newErrors.correo = "El correo electrónico no es válido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aquí puedes enviar los datos o realizar la acción de confirmación
      setDeActive(true);
      handlePurchase();
    }
  };

  const headers = {
    Authorization: `${localStorage.getItem("token")}`, // Agrega "Bearer" antes del token si es necesario
  };

  const handlePurchase = async () => {
    const id_h = jwt_decode(localStorage.getItem("token"));
    const URI = "https://frutcol-backend.onrender.com/reserva/";
    try {
      const res = await axios.post(
        URI,
        {
          id_usuario: id_h.id_usuario,
          valor_reserva: valor_reserva,
          num_productos_reserva: num_productos_reserva,
          fecha_reserva: new Date().toISOString().slice(0, 10),
          formData,
          localProds,
        },
        { headers }
      );
      if (res.data) {
        toast.success("La compra ha sido creada");
        //eliminar productos del carrito
        lProductos.map((prods) => {
          return prods.map((sub) => {
            if (sub.cantidad > 0) {
              sub.delProd(headers);
            }
          });
        });
        await new Promise((resolve) => setTimeout(resolve, 2500)); // Esperar 1 segundo
        openPopup();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="captureReceiptData" id="captureReceiptData">
      <div className="inner">
        <h1>Datos de facturación</h1>
        <div className="grid">
          <div className="n1">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            {errors.nombre && <div className="error">{errors.nombre}</div>}
          </div>
          <div className="n2">
            <label htmlFor="cedula">Cédula o NIT</label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleInputChange}
            />
            {errors.cedula && <div className="error">{errors.cedula}</div>}
          </div>
          <div className="n3">
            <label htmlFor="correo">Correo</label>
            <input
              type="text"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
            />
            {errors.correo && <div className="error">{errors.correo}</div>}
          </div>
          <div className="n4">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
            />
            {errors.direccion && (
              <div className="error">{errors.direccion}</div>
            )}
          </div>
          <div className="n5">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
            {errors.telefono && <div className="error">{errors.telefono}</div>}
          </div>
          <div className="n6">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
            />
            {errors.ciudad && <div className="error">{errors.ciudad}</div>}
          </div>
        </div>
        <div className="additional">
          <h1>Dirección de envío</h1>
          <input
            type="text"
            name="direccionEnvio"
            value={formData.direccionEnvio}
            onChange={handleInputChange}
          />
          {errors.direccionEnvio && (
            <div className="error">{errors.direccionEnvio}</div>
          )}
        </div>
        <div className="confirm">
          <button disabled={deActive} onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export const Cart = ({ lProductos }) => {
  const [total, setTotal] = useState(0);
  const [totalp, setTotalp] = useState(0);
  const [weight, setWeight] = useState(0);
  const [indicator, setIndicator] = useState([]);
  const [promt, setPromt] = useState([]);
  const [isComponentDisabled, setComponentDisabled] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (weight >= 5) {
      setComponentDisabled(false);
      setIndicator("green");
      setPromt("Todo listo para reservar!");
    } else {
      setComponentDisabled(true);
      setIndicator("orange");
      setPromt("Pedido mínimo: 5Kg");
    }
    // Actualiza el estado total con el nuevo precio total calculado
    setTotal(getTotalPrice(cart.cart));
    setTotalp(getTotalItems(cart.cart));
    setWeight(getTotalWeight(cart.cart));
  }, [cart]);

  const formatPrice = (price) => {
    const formattedNumber = price.toFixed(2);
    const parts = formattedNumber.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
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
    navigate("/");
  };

  const handleReserve = async () => {
    setComponentDisabled(true);
    setReceipt(true);
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
              cart.cart.map((prods) => {
                if (prods.cantidad_producto > 0) {
                  return (
                    <Card
                      prods={prods}
                      key={prods.id_producto}
                    />
                  );
                }
              })
            ) : (
              <div className="noprod">
                <picture>
                  <sources srcSet="../../images/37459.avif" type="image/avif" />
                  <sources srcSet="../../images/37459.webp" type="image/webp" />
                  <img
                    className="emptycar"
                    src="../../images/37459.jpg"
                    alt="No hay productos"
                  />
                </picture>

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
              Comprar
            </button>
            {receipt ? (
              <ReceiptInfo
                lProductos={lProductos}
                num_productos_reserva={totalp}
                valor_reserva={total}
                openPopup={openPopup}
              />
            ) : null}
            <div className="toast2" id="popup">
              <h2>Pasos para hacer efectiva la compra:</h2>
              <div className="pasos">
                <p>
                  1. Realice el pago del valor del pedido a Bancolombia a nombre
                  de <strong>Frutcol - A SAS</strong> cuenta de Ahorros{" "}
                  <strong>No. 601-000041-89</strong> NIT:{" "}
                  <strong>901733392-6.</strong> o a Nequi, al número{" "}
                  <strong>3108621696</strong>
                </p>
                <p>
                  2. Tome una foto o captura de pantalla del comprobante de la
                  transacción.
                </p>
                <p>
                  3. Envíe la foto del comprobante a WhatsApp al número
                  <strong> 3174358995</strong> y/o al E-mail{" "}
                  <strong>frutcol0518@gmail.com</strong>, junto con un mensaje
                  que indique el número de orden de la compra
                </p>
                <p>
                  Nota: Para ver el número de orden de la compra, hacer click en
                  el ícono de usuario, ir a ajustes, y dar click en historial de
                  compras para ver la última compra que se realizó
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

export const Carritocom = ({ lProductos }) => {
  return <Cart lProductos={lProductos} />;
};
