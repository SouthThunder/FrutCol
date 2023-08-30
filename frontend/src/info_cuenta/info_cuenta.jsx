import React, { useState } from "react";
import "./info_cuenta.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import { fresa } from "../home/sliderProds";
export const Infocuenta = () => {
  return (
    <div className="infocuenta">
      <div className="contenidos">
        <h4>Información General</h4>
        <h4>Cambio de contraseña</h4>
      </div>
      <div className="infogeneral">
        <form action="" className="form">
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            // placeholder={user.nombre}
            type="text"
            id="nombre"
            name="nombre"
          />
          <label for="">Nombre</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            // placeholder={user.apellido}
            type="text"
            id="apellido"
            name="apellido"
          />
          <label for="">Apellidos</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            // placeholder={user.cedula}
            type="text"
            id="cedula"
            name="cedula"
          />
          <label for="">Cedula</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            // placeholder={user.nombre}
            type="text"
            id="correo"
            name="correo"
          />
          <label for="">Correo electronico</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            // placeholder={user.direccion}
            type="text"
            id="direccion"
            name="direccion"
          />
          <label for="">Dirección</label>
        </div>
        <br />
        <div className="enter">
          <button>Actualizar</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export const InfoCuentacom = (prop) => {
  const [product, setProduct] = useState(fresa);
  const changeProp = (element) => {
    setProduct(element);
  };
  return (
    <div className="infoCuentacontain">
      <Headercom prod={product} />
      <Infocuenta prod={product} />
      <Footercom prod={product} />
    </div>
  );
};
