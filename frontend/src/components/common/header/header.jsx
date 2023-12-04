import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {AiOutlineUser} from "react-icons/ai";
import {BsCart2} from "react-icons/bs";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { getTotalItems } from "../../../utils/helpers";
import "./header.css";

export const HeadPopUp = ({ product, trigger, togglePopup }) => {
  const menuRef = useRef();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--btn-color",
      product.main_color
    );

    const handler = (e) => {
      if (menuRef.current !== null) {
        if (!menuRef.current.contains(e.target)) {
          togglePopup(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
  }, [product]);
  const navigate = useNavigate();

  const logout = () => {
    window.location.href = "/";
    Cookies.remove("token");
  };

  const reDirect = () => {
    navigate("/InformacionCuenta");
  };

  return (
    <div
      className={`popup-header ${trigger ? "active" : "inactive"}`}
      ref={menuRef}
      style={{ backgroundColor: product.header_color }}
    >
      <div className="popup-inner">
        <button onClick={reDirect}>Ajustes</button>
      </div>
      <div className="separator"></div>
      <div className="popup-inner">
        <button onClick={logout}>Salir</button>
      </div>
    </div>
  );
};

export const Headercom = ({ product, auth }) => {
  const cart = useSelector((state) => state.cart);
  const [popup, setPopup] = useState(false);
  const [faItems, setFaItems] = useState(true);
  const [items, setItems] = useState(0); 
  const navRef = useRef();

  const togglePopup = () => {
    setPopup(!popup);
  };

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const changePopupVis = (status) => {
    setPopup(status);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if(cart){
      setItems(getTotalItems(cart.cart));
    }
  }, [product, popup, cart]);

  const logout = () => {
    window.location.href = "/";
    Cookies.remove("token");
  };

  return (
    <header>
      <div
        className="totalheader"
        style={{
          backgroundColor: product.header_color,
          transition: "all 1s var(--btn-cubic-bezier)",
        }}
      >
        <div className="logo" onClick={() => navigate("/")}>
          <img src="images/Frame 1.png" alt="" />
          <h1>Frutcol - A</h1>
        </div>
        <nav
          ref={navRef}
          style={{
            backgroundColor: product.header_color,
            transition: "all 1s var(--btn-cubic-bezier)",
          }}
        >
          {auth ? (
            <ul>
              <li>
                <div className="nav-btn">
                  <p onClick={() => navigate('/carrito')}>Carrito</p>
                  <p onClick={() => navigate('/InformacionCuenta')}>Ajustes</p>
                  <p onClick={() => logout()}>Salir</p>
                </div>
                <button id="userIcon" onClick={togglePopup}>
                  <AiOutlineUser />
                </button>
                <HeadPopUp
                  trigger={popup}
                  product={product}
                  togglePopup={changePopupVis}
                />
              </li>
              <li>
                <button id="cartIcon" onClick={() => navigate("/carrito")}>
                  <BsCart2 />
                  <p>{items}</p>
                </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <p onClick={() => navigate('/ingreso')} onKeyDown={() => navigate('/ingreso')}>Ingresar</p>
              </li>
              <li>
                <p onClick={() => navigate('/registro')} onKeyDown={() => navigate('/registro')}>Registrarse</p>
              </li>
            </ul>
          )}
        </nav>
        {faItems ? (
          <div className="burger-menu">
            <button
              className="nav-btn"
              onClick={() => {
                showNavBar();
                setFaItems(!faItems);
              }}
            >
              <FaBars />
            </button>
          </div>
        ) : (
          <div className="burger-menu">
            <button
              className="nav-btns"
              onClick={() => {
                showNavBar();
                setFaItems(!faItems);
              }}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
