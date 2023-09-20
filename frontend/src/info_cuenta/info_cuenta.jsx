import React, { useState, useEffect, useRef } from "react";
import "./info_cuenta.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import jwt_decode from "jwt-decode";
import axios from "axios";
import LoadingSpinner from "../loading/LoadingSpinner";

const numeros = /^\d+$/; // Solo números
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const texto = /^[A-Za-zÁ-ÿ\s]+$/; // Solo letras y espacios

const URI = "https://frutcola-backendpru.onrender.com/usuarios/";
const URI2 = "https://frutcola-backendpru.onrender.com/usuarios/contrasena/";
export const Infocuenta = (prop) => {
  const handleActualizar = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("token");
    const headers = {
      Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
    };

    let nombre_usuario = document.getElementById("nombre")?.value || "";
    let apellido_usuario = document.getElementById("apellido")?.value || "";
    let cedula_usuario = document.getElementById("cedula")?.value || "";
    let correo_usuario = document.getElementById("correo")?.value || "";
    let direccion_usuario = document.getElementById("direccion")?.value || "";
    let id_usuario = prop.user[0].id_usuario;
    let contrasena_usuario = prop.user[0].contrasena_usuario;
    let role = prop.user[0].role;

    if (nombre_usuario !== "" && !texto.test(nombre_usuario)) {
      alert("Ingrese un nombre válido");
      return;
    } else {
      if (nombre_usuario === "") {
        nombre_usuario = prop.user[0].nombre_usuario;
      }
    }
    if (apellido_usuario !== "" && !texto.test(apellido_usuario)) {
      alert("Ingrese un apellido válido");
      return;
    } else {
      if (apellido_usuario === "") {
        apellido_usuario = prop.user[0].apellido_usuario;
      }
    }
    if (
      cedula_usuario !== "" &&
      (!numeros.test(cedula_usuario) || cedula_usuario.lenght > 10)
    ) {
      alert("Ingrese una cedula válido");
      return;
    } else {
      if (cedula_usuario === "") {
        cedula_usuario = prop.user[0].cedula_usuario;
      }
    }
    if (correo_usuario !== "" && !emailRegex.test(correo_usuario)) {
      alert("Ingrese un correo válido");
      return;
    } else {
      if (correo_usuario === "") {
        correo_usuario = prop.user[0].correo_usuario;
      }
    }
    if (direccion_usuario === "") {
      direccion_usuario = prop.user[0].direccion_usuario;
    }
    console.log(nombre_usuario);
    const user = {
      nombre_usuario,
      apellido_usuario,
      cedula_usuario,
      correo_usuario,
      direccion_usuario,
      id_usuario,
      contrasena_usuario,
      role,
    };
    try {
      await axios.put(`${URI}${prop.user[0].id_usuario}`, user, {
        headers
      });
      alert("Los datos se actualizaron correctamente");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar los datos");
    }
  };
  return (
    <div className="infogeneral">
      <form action="" className="form">
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            placeholder={prop.user[0].nombre_usuario}
            type="text"
            id="nombre"
            name="nombre"
          />
          <label htmlFor="">Nombre</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            placeholder={prop.user[0].apellido_usuario}
            type="text"
            id="apellido"
            name="apellido"
          />
          <label htmlFor="">Apellidos</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            placeholder={prop.user[0].cedula_usuario}
            type="text"
            id="cedula"
            name="cedula"
          />
          <label htmlFor="">Cedula</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            placeholder={prop.user[0].correo_usuario}
            type="text"
            id="correo"
            name="correo"
          />
          <label htmlFor="">Correo electronico</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            placeholder={prop.user[0].direccion_usuario}
            type="text"
            id="direccion"
            name="direccion"
          />
          <label htmlFor="">Dirección</label>
        </div>
        <br />
        <div className="enter">
          <button onClick={handleActualizar}>Actualizar</button>
        </div>
      </form>
    </div>
  );
};
export const Infocontenidos = (prop) => {
  return (
    <div className="contenidos">
      <div className="imagecontain">
        <img src="../../images/userIcon.png" alt="" />
      </div>

      <h4
        onClick={() => prop.onSelectOption("infocuenta")}
        style={{
          backgroundColor:
            prop.selectedOption === "infocuenta" ? "#f2f2f2" : "transparent",
        }}
      >
        Información General
      </h4>
      <h4
        onClick={() => prop.onSelectOption("cambiocontraseña")}
        style={{
          backgroundColor:
            prop.selectedOption === "cambiocontraseña"
              ? "#f2f2f2"
              : "transparent",
        }}
      >
        Cambio de contraseña
      </h4>
    </div>
  );
};
export const Informacioncuenta = (prop) => {
  const [selectedOption, setSelectedOption] = useState("infocuenta"); // Por defecto muestra "infocuenta"

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="infocuenta">
      <Infocontenidos
        onSelectOption={handleOptionChange}
        selectedOption={selectedOption}
      />
      {selectedOption === "infocuenta" ? (
        <Infocuenta prod={prop} user={prop.userData} />
      ) : selectedOption === "cambiocontraseña" ? (
        <Cambiocontraseña prod={prop} user={prop.userData} />
      ) : null}
    </div>
  );
};
export const Cambiocontraseña = (prop) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleActualizarContra = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("token");
const headers = {
  Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
};

    let id_usuario = prop.user[0].id_usuario;
    let contrasena_usuario1 =
      document.getElementById("contrasena")?.value || "";
      let confirmacioncontra =
      document.getElementById("newcontrasena")?.value || "";

    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/; // Al menos un número, una mayúscula y 8 o más caracteres
    if (!passwordPattern.test(contrasena_usuario1)) {
      alert(
        "La contraseña debe contener al menos un número, una mayúscula y tener 8 o más caracteres."
      );
      return;
    }
    if (contrasena_usuario1 !== confirmacioncontra) {
      alert("Las contraseñas deben coincidir");
      return;
    }

    const newcontra = {
      id_usuario: prop.user[0].id_usuario,
      contrasena_usuario: contrasena_usuario1,
    };
    try {
      await axios.put(`${URI2}${prop.user[0].id_usuario}`, newcontra, {
        headers,
      });

      alert("Los datos se actualizaron correctamente");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar los datos");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="cambiocontrasena">
      <form action="" className="form">
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            type={showPassword ? "text" : "password"}
            id="contrasena"
            name="contrasena"
          />
          <label htmlFor="">Nueva contraseña</label>
          <button
            className="invisible"
            type="button"
            onClick={togglePasswordVisibility}
          >
            <img
              src={showPassword ? "images/ojo.png" : "images/invisible.png"}
              alt={showPassword ? "visible" : "invisible"}
            />
          </button>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input type="password" id="newcontrasena" name="newcontrasena" />
          <label htmlFor="">Confirmar nueva contraseña</label>
          <button
            className="invisible"
            type="button"
            onClick={togglePasswordVisibility}
          >
            <img
              src={showPassword ? "images/ojo.png" : "images/invisible.png"}
              alt={showPassword ? "visible" : "invisible"}
            />
          </button>
        </div>
        <br />
        <div className="enter">
          <button onClick={handleActualizarContra}>Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export const InfoCuentacom = ( {product} ) => {
  const decode = jwt_decode(localStorage.getItem("token"));
  const [isLoading, setisLoading] = useState(true);
  const firstRender = useRef(true);

  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  const accessToken = localStorage.getItem("token");
  const headers = {
    Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
  };

  useEffect(() => {
    // Obtener datos del usuario cuando el componente se monta
    if (firstRender.current) {
      getUserData();
      firstRender.current = false;
    } else {
      if (
        userData !== null &&
        headers.Authorization !== null
      ) {
        document.documentElement.style.setProperty('--background-btn', product.main_color);
        document.documentElement.style.setProperty('--btn-color', product.main_color);
        setisLoading(false);
      }
    }
  }, [userData, headers]);

  const getUserData = async () => {
    console.log(decode.id_usuario)
    try {
      const res = await axios.get(`${URI}${decode.id_usuario}`, { headers });
      console.log('test')
      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="infoCuentacontain">
      <Headercom product={product} />
      <Informacioncuenta product={product} userData={userData} />
      <Footercom product={product} />
    </div>
  );
};
