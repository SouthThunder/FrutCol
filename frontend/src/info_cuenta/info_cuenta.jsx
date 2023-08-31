import React, { useState } from "react";
import "./info_cuenta.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import { fresa } from "../home/sliderProds";
export const Infocuenta = () => {
  return (
    
      
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
   
  );
};
export const Infocontenidos = (prop) => {
  return(
    <div className="contenidos">
      <h4 onClick={() => prop.onSelectOption("infocuenta")} style={{ backgroundColor: prop.selectedOption === "infocuenta" ? "#f2f2f2" : "transparent" }}>Información General</h4>
      <h4 onClick={() => prop.onSelectOption("cambiocontraseña")} style={{ backgroundColor: prop.selectedOption === "cambiocontraseña" ? "#f2f2f2" : "transparent" }}>Cambio de contraseña</h4>
    </div>
    
  );

};
export const Informacioncuenta = (prop) => {
  const [selectedOption, setSelectedOption] = useState("infocuenta"); // Por defecto muestra "infocuenta"

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return(
    <div className="infocuenta">
      <Infocontenidos onSelectOption={handleOptionChange} selectedOption={selectedOption} />
      {selectedOption === "infocuenta" ? (
        <Infocuenta prod={prop}/>
      ) : selectedOption === "cambiocontraseña" ? (
        <Cambiocontraseña prod={prop} />
      ) : null}
    </div>
  )
}
export const Cambiocontraseña = (prop) => {
  return(
    <div className="cambiocontrasena">
      <form action="" className="form">
      <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            // placeholder={user.nombre}
            type="password"
            id="contrasena"
            name="contrasena"
          />
          <label for="">Nueva contraseña</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            // placeholder={user.nombre}
            type="password"
            id="newcontrasena"
            name="newcontrasena"
          />
          <label for="">Confirmar nueva contraseña</label>
        </div>
        <br />
        <div className="enter">
          <button>Actualizar</button>
        </div>
      </form>
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
      <Informacioncuenta prod={product} />
      <Footercom prod={product} />
    </div>
  );
};
