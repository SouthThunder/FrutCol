import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../../common/loading/LoadingSpinner.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { FaUser } from "react-icons/fa";
import { getOrder } from "../../../services/reserva.js";
import Cookie from "js-cookie";
import "./info_cuenta.css";
import { updateUser } from "../../../services/user.js";
import { HistorialReservas } from "./histReserva.jsx";
import { Cambiocontraseña } from "./CambioContra.jsx";
import { ProductosReserva } from "./histReserva.jsx";


const numeros = /^\d+$/; // Solo números
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const texto = /^[A-Za-zÁ-ÿ\s]+$/; // Solo letras y espacios



export const Infocuenta = (prop) => {
  const headers = prop.headers;
  useEffect(() => {
    console.log();
  }, [headers]);

  const handleActualizar = async (e) => {
    e.preventDefault();

    let nombre_usuario = document.getElementById("nombre")?.value || "";
    let apellido_usuario = document.getElementById("apellido")?.value || "";
    let cedula_usuario = document.getElementById("cedula")?.value || "";
    let correo_usuario = document.getElementById("correo")?.value || "";
    let direccion_usuario = document.getElementById("direccion")?.value || "";
    let id_usuario = prop.user[0].id_usuario;
    let contrasena_usuario = prop.user[0].contrasena_usuario;
    let role = prop.user[0].role;

    if (nombre_usuario !== "" && !texto.test(nombre_usuario)) {
      toast.error("Ingrese un nombre válido");
      return;
    } else {
      if (nombre_usuario === "") {
        nombre_usuario = prop.user[0].nombre_usuario;
      }
    }
    if (apellido_usuario !== "" && !texto.test(apellido_usuario)) {
      toast.error("Ingrese un apellido válido");
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
      toast.error("Ingrese una cedula válido");
      return;
    } else {
      if (cedula_usuario === "") {
        cedula_usuario = prop.user[0].cedula_usuario;
      }
    }
    if (correo_usuario !== "" && !emailRegex.test(correo_usuario)) {
      toast.error("Ingrese un correo válido");
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
      await updateUser(id_usuario, user,Cookie.get("token"));
      toast.success("Los datos se actualizaron correctamente");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar los datos");
    }
  };
  return (
    <div className="infogeneral">
      <form action="" className="form">
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            placeholder={prop.user.name}
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
            placeholder={prop.user.lastname}
            type="text"
            id="apellido"
            name="apellido"
          />
          <label htmlFor="">Apellidos</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input type="text" id="cedula" name="cedula" />
          <label htmlFor="">Cedula</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input
            placeholder={prop.user.email}
            type="text"
            id="correo"
            name="correo"
          />
          <label htmlFor="">Correo electronico</label>
        </div>
        <div className="input__info">
          <small className="errores">Error message</small>
          <ion-icon name="person"></ion-icon>
          <input type="text" id="direccion" name="direccion" />
          <label htmlFor="">Dirección</label>
        </div>
        <br />
        <div className="enter">
          <button onClick={handleActualizar}>Actualizar</button>
        </div>
        <Toaster richColors />
      </form>
    </div>
  );
};
export const Infocontenidos = (prop) => {
  const navigate = useNavigate();

  const extraOpt = () => {
    if (prop.admin) {
      return (
        <button onClick={() => navigate("/InterfazAdmin")}>
          Administrador
        </button>
      );
    } else {
      return;
    }
  };

  return (
    <div className="contenidos">
      <div className="imagecontain">
        <FaUser />
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
        onClick={() => prop.onSelectOption("historialReserva")}
        style={{
          backgroundColor:
            prop.selectedOption === "historialReserva"
              ? "#f2f2f2"
              : "transparent",
        }}
      >
        Historial de Reservas
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
      {extraOpt()}
    </div>
  );
};




export const Informacioncuenta = (prop) => {
  const [selectedOption, setSelectedOption] = useState("infocuenta"); // Por defecto muestra "infocuenta"
  const [selectedReservation, setSelectedReservation] = useState(null);
  useEffect(() => {}, []);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="infocuenta">
      <Infocontenidos
        onSelectOption={handleOptionChange}
        selectedOption={selectedOption}
        admin={prop.admin}
      />
      {selectedOption === "infocuenta" ? (
        <Infocuenta prod={prop} user={prop.userData} headers={prop.headers} />
      ) : selectedOption === "historialReserva" ? (
        <HistorialReservas
          onSelectOption={handleOptionChange}
          onSelectReservation={setSelectedReservation}
          userHistory={prop.userHistory}
        />
      ) : selectedOption === "cambiocontraseña" ? (
        <Cambiocontraseña prod={prop} user={prop.userData} />
      ) : selectedOption === "productosreserva" ? (
        <ProductosReserva
          prod={prop}
          reservation={selectedReservation}
          onSelectOption={handleOptionChange}
          headers={prop.headers}
          prodsPool={prop.prodsPool}
        />
      ) : null}
    </div>
  );
};


export const InfoCuentacom = ({ product, prodsPool }) => {
  const user = useSelector((state) => state.user);
  const [isLoading, setisLoading] = useState(true);
  const firstRender = useRef(true);
  const [userHistory, setUserHistory] = useState(user);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Obtener datos del usuario cuando el componente se monta
    if (firstRender.current) {
      getHistoryData();
      firstRender.current = false;
    } else {
      if (userHistory !== null) {
        document.documentElement.style.setProperty(
          "--background-btn",
          product.main_color
          );
          document.documentElement.style.setProperty(
            "--btn-color",
            product.main_color
            );
            if (user.role === "superusuario") {
              console.log('enter')
              setAdmin(true);
            }
            setisLoading(false);
      }
    }
  }, [userHistory]);

  const getHistoryData = async () => {
    try {
      const res = await getOrder(Cookie.get("token"));
      setUserHistory(res);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(userHistory);

  return (
    <div className="infoCuentacontain">
      <Informacioncuenta
        product={product}
        userHistory={userHistory}
        prodsPool={prodsPool}
        userData={user}
        admin={admin}
      />
    </div>
  );
};
