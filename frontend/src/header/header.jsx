import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { ShoppingCart } from "../carrito/shoppingCart";

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
      className={`popup-header ${trigger? 'active' : 'inactive'}`}
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

export const Headercom = ({
  product,
  lProductos,
  headers,
  token,
  prodsPool,
}) => {
  const [header, setHeader] = useState([]);
  const [popup, setPopup] = useState(false);
  const [cartVis, setCartVis] = useState(false);

  const changeCartVis = (status) => {
    setCartVis(status);
  };

  const changePopupVis = (status) => {
    setPopup(status);
  };

  const navigate = useNavigate();
  useEffect(() => {
    validateToken();
  }, [product, popup, cartVis]);

  const validateToken = () => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    )
      setHeader(notAuthUser);
    else {
      setHeader(authUser);
    }
  };

  const notAuthUser = () => {
    const logIn = () => {
      navigate("/IngresoOp");
    };
    const signUp = () => {
      navigate("/RegistroOp");
    };

    return (
      <div className="header">
        <nav
          className="nav-bar"
          style={{
            backgroundColor: product.header_color,
            transition: "all 1s var(--btn-cubic-bezier)",
          }}
        >
          <a href="/" className="nav__logo">
            <img src="images/Frame 1.png" alt="" />
            <p
              style={{
                color: product.main_color,
                transition: "all 1s var(--btn-cubic-bezier)",
              }}
            >
              FrutCol
            </p>
          </a>
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <button
                  className="nav__link"
                  onClick={signUp}
                  style={{
                    backgroundColor: product.main_color,
                    transition: "all 1s var(--btn-cubic-bezier)",
                  }}
                >
                  Registrarse
                </button>
              </li>
              <li className="nav__item">
                <button
                  className="nav__link"
                  onClick={logIn}
                  style={{
                    color: product.main_color,
                    transition: "all 1s var(--btn-cubic-bezier)",
                  }}
                >
                  Iniciar sesión
                </button>
              </li>
              <li className="nav__item">
                <button onClick={() => navigate("/ingreso")}>
                  <img src="images/carrito.png" />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  };

  const authUser = () => {
    const togglePopup = () => {
      setPopup(!popup);
    };

    const toggleCart = () => {
      setCartVis(!cartVis);
    };

    return (
      <div className="header">
        <nav
          className="nav-bar"
          style={{
            backgroundColor: product.header_color,
            transition: "all 1s var(--btn-cubic-bezier)",
          }}
        >
          <a href="/" className="nav__logo">
            <img src="images/Frame 1.png" alt="" />
            <p
              style={{
                color: product.main_color,
                transition: "all 1s var(--btn-cubic-bezier)",
              }}
            >
              FrutCol
            </p>
          </a>
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <button id="userIcon" onClick={togglePopup}>
                  <img src="/images/userIcon.png" alt="" />
                </button>
                <HeadPopUp
                  trigger={popup}
                  product={product}
                  togglePopup={changePopupVis}
                />
              </li>
              <li className="nav__item">
                <button onClick={toggleCart}>
                  <img src="images/carrito.png" />
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <ShoppingCart
          visibility={cartVis}
          changeCartVis={changeCartVis}
          lProductos={lProductos}
          headers={headers}
          prodsPool={prodsPool}
        />
      </div>
    );
  };

  return header;
};
