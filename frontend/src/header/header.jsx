import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./header.css";
import { ShoppingCart } from "../home/shoppingCart";

export const HeadPopUp = ({product, trigger}) => {
  useEffect(() => {
    
  }, [product]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      {!trigger && (
        <div
          className="popup-header"
          style={{ backgroundColor: product.header_color }}
        >
          <div className="popup-inner">
            <Link
              to={"/InformacionCuenta"}
              style={{ color: product.main_color }}
            >
              Settings
            </Link>
          </div>
          <div className="popup-inner">
            <span className="separator"></span>
          </div>
          <div className="popup-inner">
            <button
              onClick={logout}
              style={{ color: product.main_color }}
              onMouseEnter={(e) => (
                (e.target.style.backgroundColor = product.main_color),
                (e.target.style.color = "#FFFF")
              )}
              onMouseLeave={(e) => (
                (e.target.style.backgroundColor = product.header_color),
                (e.target.style.color = product.main_color)
              )}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Headercom = ({product}) => {
  const token = localStorage.getItem("token");
  const [header, setHeader] = useState([]);
  const [popup, setPopup] = useState([]);
  const [cartVis, setCartVis] = useState(false);

  const changeCartVis= (status) =>{
    setCartVis(status)
  }

  const navigate = useNavigate();
  useEffect(() => {
    validateToken();
  }, [product, popup, cartVis]);

  const validateToken = () => {
    if (token === null) setHeader(notAuthUser);
    else {
      setHeader(authUser);
    }
  };

  const notAuthUser = () => {
    const logIn = () => {
      navigate("/Ingreso");
    };
    const signUp = () => {
      navigate("/Registro");
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
              FrutCol-A
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
                    color: product.font_color,
                    transition: "all 1s var(--btn-cubic-bezier)",
                  }}
                >
                  Iniciar sesión
                </button>
              </li>
              <li className="nav__item">
                <button>
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
      setCartVis(!cartVis)
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
              FrutCol-A
            </p>
          </a>
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <button id="userIcon" onClick={togglePopup}>
                  <img src="/images/userIcon.png" alt="" />
                </button>
                <HeadPopUp trigger={popup} product={product} />
              </li>
              <li className="nav__item">
                <button onClick={toggleCart}>
                  <img src="images/carrito.png" />
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <ShoppingCart visibility={cartVis} changeCartVis={changeCartVis}/>
      </div>
    );
  };

  return header;
};
