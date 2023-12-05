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



export const Cambiocontraseña = (prop) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleActualizarContra = async (e) => {
      e.preventDefault();
  
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
      };
  
      let contrasena_usuario1 =
        document.getElementById("contrasena")?.value || "";
      let confirmacioncontra =
        document.getElementById("newcontrasena")?.value || "";
  
      const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/; // Al menos un número, una mayúscula y 8 o más caracteres
      if (!passwordPattern.test(contrasena_usuario1)) {
        toast.error(
          "La contraseña debe contener al menos un número, una mayúscula y tener 8 o más caracteres."
        );
        return;
      }
      if (contrasena_usuario1 !== confirmacioncontra) {
        toast.error("Las contraseñas deben coincidir");
        return;
      }
  
      const newcontra = {
        id_usuario: prop.user[0].id_usuario,
        contrasena_usuario: contrasena_usuario1,
      };
      try {
        await updateUser(prop.user[0].id_usuario, newcontra);
        toast.success("Los datos se actualizaron correctamente");
        window.location.reload();
      } catch (error) {
        console.error(error);
        toast.error("Error al actualizar los datos");
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
            <input
              type={showPassword ? "text" : "password"}
              id="newcontrasena"
              name="newcontrasena"
            />
            <label htmlFor="">Confirmar nueva contraseña</label>
            <button
              className="invisible"
              type="button"
              onClick={togglePasswordVisibility}
            >
              <picture>
                <source
                  srcSet={
                    showPassword
                      ? "../../images/ojo.avif"
                      : "../../images/invisible.avif"
                  }
                  type="image/avif"
                />
                <source
                  srcSet={
                    showPassword
                      ? "../../images/ojo.webp"
                      : "../../images/invisible.webp"
                  }
                  type="image/webp"
                />
                <img
                  className="emptycar"
                  src={
                    showPassword
                      ? "../../images/ojo.jpg"
                      : "../../images/invisible.jpg"
                  }
                  alt={showPassword ? "visible" : "invisible"}
                />
              </picture>
            </button>
          </div>
          <br />
          <div className="enter">
            <button onClick={handleActualizarContra}>Actualizar</button>
          </div>
          <Toaster richColors />
        </form>
      </div>
    );
  };
  