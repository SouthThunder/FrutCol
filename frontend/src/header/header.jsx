import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./header.css";

export const HeadPopUp = (props) =>{

  useEffect(()=>{

  }, [])

  const logout = () => {
      localStorage.clear();
      window.location.href = '/';
    }

  return (
      <div>
          {
          !props.trigger && (
              <div className="popup-header" style={{backgroundColor: props.prod.headerColor}}>
                  <div className="popup-inner" >
                      <Link to={'/InformacionCuenta'} style={{color: props.prod.mainColor}}>Settings</Link>
                  </div>
                  <div className="popup-inner" >
                      <span className="separator"></span>
                  </div>
                  <div className="popup-inner">
                      <button 
                      onClick={logout} style={{color: props.prod.mainColor}}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = props.prod.mainColor,
                          e.target.style.color = '#FFFF')
                      }
                      onMouseLeave={(e) => (e.target.style.backgroundColor = props.prod.headerColor,
                        e.target.style.color=props.prod.mainColor)}
                      >
                        Log Out</button>
                  </div>
              </div>
              )
          }
      </div>
  )
}

export const Headercom = (props) => {
  const token = localStorage.getItem("token");
  const [header, setHeader] = useState([]);
  const [popup, setPopup] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    validateToken();
  }, [props, popup]);

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
            backgroundColor: props.prod.headerColor,
            transition: "all 1s var(--btn-cubic-bezier)",
          }}
        >
          <a href="/" className="nav__logo">
            <img src="images/Frame 1.png" alt="" />
            <p
              style={{
                color: props.prod.mainColor,
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
                    backgroundColor: props.prod.mainColor,
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
                    color: props.prod.fontColor,
                    transition: "all 1s var(--btn-cubic-bezier)",
                  }}
                >
                  Iniciar sesión
                </button>
              </li>
              <li className="nav__item">
                <Link to={'/Carrito'}><img src="images/carrito.png" /></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  };

  const authUser = () => {

    const togglePopup = () =>{
      setPopup(!popup);
    }

    return (
      <div className="header">
        <nav
          className="nav-bar"
          style={{
            backgroundColor: props.prod.headerColor,
            transition: "all 1s var(--btn-cubic-bezier)",
          }}
        >
          <a href="/" className="nav__logo">
            <img src="images/Frame 1.png" alt="" />
            <p
              style={{
                color: props.prod.mainColor,
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
                <HeadPopUp trigger={popup} prod={props.prod}/>
              </li>
              <li className="nav__item">
                <Link to={'/Carrito'}><img src="images/carrito.png" /></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  };

  return header;
};
