import { useState } from "react";

import { Toaster, toast } from "sonner";
import { IoEyeOff, IoEye } from "react-icons/io5";
import Cookie from "js-cookie";
import "./info_cuenta.css";
import { updateUserPassword } from "../../../services/user.js";



export const Cambiocontraseña = (prop) => {
    const [showPassword, setShowPassword] = useState(false);
   
    const handleActualizarContra = async (e) => {
      e.preventDefault();
  
     
  
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
        id_usuario: prop.user.id,
        contrasena_usuario: contrasena_usuario1,
      };
      try {
        await updateUserPassword(prop.user.id, newcontra,Cookie.get("token"));
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
             {showPassword ?  <IoEye /> : <IoEyeOff />}
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
              {showPassword ?  <IoEye /> : <IoEyeOff />}
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
  