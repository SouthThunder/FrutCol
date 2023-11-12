import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaShoppingBasket } from "react-icons/fa";
import "./header.css";
import {AiOutlineUser} from "react-icons/ai";
import {BsCart2} from "react-icons/bs";

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
    localStorage.clear();
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

export const Headercom = ({ product }) => {
  const [header, setHeader] = useState([]);
  const [popup, setPopup] = useState(false);
  const [faItems, setFaItems] = useState(true);

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
    validateToken();
  }, [product, popup]);

  const validateToken = () => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      setHeader(false);
    } else {
      setHeader(true);
    }
  };

  const logout = () => {
    window.location.href = "/";
    localStorage.clear();
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
          <h1>Frutcol - A SAS</h1>
        </div>
        <nav
          ref={navRef}
          style={{
            backgroundColor: product.header_color,
            transition: "all 1s var(--btn-cubic-bezier)",
          }}
        >
          {header ? (
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
                </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <a href="/Ingreso">Ingresar</a>
              </li>
              <li>
                <a href="/registro">Registrarse</a>
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
