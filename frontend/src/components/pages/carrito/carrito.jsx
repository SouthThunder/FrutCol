import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { EmptyCart } from "../../common/emptyCart/EmptyCart";
import { ReceiptInfo } from "./receiptData";
import {
  sumItemFromCart,
  restItemFromCart,
  clearItemFromCart,
} from "../../../redux/cartSlice";
import {
  getTotalItems,
  getTotalWeight,
  getTotalPrice,
  formatPrice,
  prodTotalPrice,
  formatWeight,
} from "../../../utils/helpers";
import "./carrito.css";
import Cookie from "js-cookie";
import { updateProductFromCart } from "../../../services/cart";

export const Card = ({ prods }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const sumCantidad = async () => {
    dispatch(sumItemFromCart(prods));
    if (Cookie.get("token")) {
      const res = await updateProductFromCart(
        Cookie.get("token"),
        user.id,
        prods.id_producto,
        (prods.cantidad_producto + 1)
      );
      if (res.status === 200) {
        console.log("Elemento actualizado");
      }
    }
  };

  const subsCantidad = async () => {
    dispatch(restItemFromCart(prods));
    if (Cookie.get("token")) {
      const res = await updateProductFromCart(
        Cookie.get("token"),
        user.id,
        prods.id_producto,
        (prods.cantidad_producto -1)
      );
      if (res.status === 200) {
        console.log("Elemento actualizado");
      }
    }
  };

  const removeItem = async () => {
    dispatch(clearItemFromCart(prods));
    if (Cookie.get("token")) {
      const res = await updateProductFromCart(
        Cookie.get("token"),
        user.id,
        prods.id_producto,
        0
      );
      if (res.status === 200) {
        console.log("Elemento actualizado");
      }
    }
  }

  return (
    <div className="card">
      <div className="name">
        <p>{prods.nombre}</p>
      </div>
      <div className="info">
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
        <div className="price">
          <p>$ {formatPrice(prods.precio_producto)}</p>
        </div>
        <div className="quantity">
          <div className="panel">
            <button onClick={() => subsCantidad()}>-</button>
            <p>{prods.cantidad_producto}</p>
            <button onClick={() => sumCantidad()}>+</button>
          </div>
        </div>
        <div className="subtotal">
          <p>$ {formatPrice(prodTotalPrice(prods))}</p>
        </div>
        <button onClick={() => removeItem()}>X</button>
      </div>
    </div>
  );
};

export const Cart = () => {
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
    setTotal(getTotalPrice(cart.cart));
    setTotalp(getTotalItems(cart.cart));
    setWeight(getTotalWeight(cart.cart));

    if (getTotalWeight(cart.cart) >= 5) {
      setComponentDisabled(false);
      setIndicator("green");
      setPromt("Todo listo para reservar!");
    } else {
      setComponentDisabled(true);
      setIndicator("orange");
      setPromt("Pedido mínimo: 5Kg");
    }
    // Actualiza el estado total con el nuevo precio total calculado
  }, [cart, isComponentDisabled]);

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
                  return <Card prods={prods} key={prods.id_producto} />;
                }
              })
            ) : (
              <div className="noprod">
                <EmptyCart />
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
              <p>{formatWeight(weight)} Kg</p>
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
            {receipt ? <ReceiptInfo openPopup={openPopup} /> : null}
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
