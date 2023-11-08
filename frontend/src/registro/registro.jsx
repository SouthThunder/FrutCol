import React, { useState } from "react";
import "./registro.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Toaster, toast } from "sonner";
import GoogleLogin from "react-google-login";

export const Registrocom = ({ refresh }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    contrasena: "",
    correo: "",
    direccion: "",
  });

  const [formError, setFormError] = useState("");

  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async () => {
    //validaciones de contenido
    //validacion de contenido nombre
    for (const key in formData) {
      if (!formData[key]) {
        setFormError("Por favor, llena todos los campos vacíos.");
        return;
      }
    }
    setFormError(""); // Borrar el mensaje de error si no hay campos vacíos
    const URI = "https://frutcol-backend.onrender.com/usuarios/register";

    // Queda por enviar
    try {
      await axios.post(URI, {
        nombre_usuario: formData.nombre,
        apellido_usuario: formData.apellido,
        cedula_usuario: formData.cedula,
        contrasena_usuario: formData.contrasena,
        correo_usuario: formData.correo,
        direccion_usuario: formData.direccion,
      });
      authToken();
      toast.success("Registro exitoso!");
    } catch (error) {
      console.error(error);
    }
  };

  const authToken = async () => {
    try {
      const URI = "https://frutcol-backend.onrender.com/usuarios/login";
      const res = await axios.post(URI, {
        correo_usuario: formData.correo,
        contrasena_usuario: formData.contrasena,
      });
      localStorage.setItem("token", res.data.token);
      getId(res.data.token);
      navigate("/");
      refresh();
    } catch (error) {
      console.error(error);
    }
  };


  const getId = async (token) => {
    const URI = "https://frutcol-backend.onrender.com/carrito/create";
    const headers = {
      Authorization: `${token}`, // Agrega "Bearer" antes del token si es necesario
    };
    try {
      const decode = jwt_decode(token);
      await axios.post(
        URI,
        {
          id_carrito: decode.id_usuario,
        },
        {
          headers,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const responseGoogleS = async (response) => {
    console.log(response.profileObj);
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Esperar 1 segundo
    const URI = "https://frutcol-backend.onrender.com/usuarios/registerg";
    try {
      await axios.post(URI, {
        nombre_usuario: response.profileObj.givenName,
        apellido_usuario: response.profileObj.familyName,
        correo_usuario: response.profileObj.email,
      });
      authTokenn(response);
      toast.success("Registro exitoso!");
    } catch (error) {
      toast.error("El correo ya se encuentra en uso");
      console.error(error);
    }
  };
  const authTokenn = async (response) => {
    try {
      const URI = "https://frutcol-backend.onrender.com/usuarios/loging";
      const res = await axios.post(URI, {
        correo_usuario: response.profileObj.email,
      });
      localStorage.setItem("token", res.data.token);
      getId(res.data.token);
      navigate("/");
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const responseGoogleE = async (response) => {
    console.log(response.profileObj);
    toast.error("Error al crear la cuenta");
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Esperar 1 segundo
  };

  return (
    <div className="registrocontain">
      <div className="contderform">
        <h1>Registro</h1>
        <br />

        <div className="form">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            onChange={handleInputChange}
            value={formData.nombre}
          />
          <br />

          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            onChange={handleInputChange}
            value={formData.apellido}
          />
          <br />

          <label htmlFor="cedula">Cédula:</label>
          <input
            type="number"
            id="cedula"
            name="cedula"
            inputMode="numeric"
            onChange={handleInputChange}
            value={formData.cedula}
          />
          <br />

          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            onChange={handleInputChange}
            value={formData.direccion}
          />
          <br />

          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            onChange={handleInputChange}
            value={formData.correo}
          />
          <br />

          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            onChange={handleInputChange}
            value={formData.contrasena}
          />
          <br />

          <button type="submit" onClick={handleSubmit}>
            Registrarse
          </button>
        </div>

        {formError && <p className="error">{formError}</p>}
        <div className="googleAuth">
          <GoogleLogin
            clientId="336496153339-bfh9gkv3l2ktbgnq5725nba8kp84u5ff.apps.googleusercontent.com"
            buttonText="Registrate con Google"
            onSuccess={responseGoogleS}
            onFailure={responseGoogleE}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <Toaster richColors />
      </div>

      <div className="contizform">
        <div className="logo-container">
          <Link to={"/"} className="nav__logo">
            <img src="images/Frame 1.png" alt="" />
            <p
              style={{
                transition: "all 1s var(--btn-cubic-bezier)",
              }}
            >
              FrutCol
            </p>
          </Link>
        </div>

        <h1>¿Ya tienes cuenta?</h1>
        <p>Si es así, inicia sesión con nosotros</p>
        <br />
        <br />
        <br />

        <Link to={"/Ingreso"}>
          <button className="botonizform">Iniciar sesión</button>
        </Link>
      </div>
    </div>
  );
};
