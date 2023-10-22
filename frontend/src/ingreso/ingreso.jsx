import React, { useEffect, useState } from "react";
import "./ingreso.css";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Toaster, toast } from "sonner";
import GoogleLogin from "react-google-login";
import axios from "axios";

const URI = "https://frutcol-backend-r3lq.onrender.com/usuarios/login";

export const Ingresocom = ({ refresh }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localuser, setLocalUser] = useState("");
  const [localpassword, setlocalPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailInputClass, setEmailInputClass] = useState("");
  const [passwordInputClass, setPasswordInputClass] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [credentialInputClass, setCredentialInputClass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const test = async () => {
    console.log("validating...");

    if (!localuser || localuser === undefined || localuser === "") {
      setEmailError("Ingrese su correo");
      setEmailInputClass("shake");
      setTimeout(() => {
        setEmailInputClass("");
      }, 500);
      return;
    } else {
      setEmailError("");
      setEmailInputClass("");
    }

    if (!localpassword || localpassword == undefined) {
      setPasswordError("Ingrese su contraseña");
      setPasswordInputClass("shake");
      setTimeout(() => {
        setPasswordInputClass("");
      }, 500);
      return;
    } else {
      setPasswordError("");
      setPasswordInputClass("");
    }

    try {
      const res = await axios.post(URI, {
        correo_usuario: localuser,
        contrasena_usuario: localpassword,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
      refresh();
    } catch (error) {
      console.error(error);
      setCredentialError("Credenciales incorrectas, intente una vez mas ");
      setCredentialInputClass("shake");
      setTimeout(() => {
        setCredentialInputClass("");
      }, 500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const responseGoogleS = async (response) => {
    console.log("entree");
    authToken(response);
  };
  const authToken = async (response) => {
    try {
      const URI = "https://frutcol-backend-r3lq.onrender.com/usuarios/loging";
      const res = await axios.post(URI, {
        correo_usuario: response.profileObj.email,
      });
      localStorage.setItem("token", res.data.token);
      getId(res.data.token);
      navigate("/");
      refresh();
    } catch (error) {
      toast.error("No existe una cuenta registrada con este correo.");
      console.error(error);
    }
  };

  const getId = async (token) => {
    const URI = "https://frutcol-backend-r3lq.onrender.com/carrito/create";
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

  const responseGoogleE = async (response) => {
    console.log(response.profileObj);
    toast.error("Error al iniciar sesión");
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Esperar 1 segundo
  };

  return (
    <div className="ingresocontain" id="home">
      <div className="contizformlogin">
        <h1>¿Eres nuevo?</h1>
        <p>Se parte de FrutColA</p>
        <br />
        <br />
        <br />
        <Link to={"/Registro"}>
          <button className="botonizform">Registrarse</button>
        </Link>
      </div>
      <div className="contderformlogin">
        <h1>Inicio de sesión</h1>
        <br />
        <p className="separadorform"></p>
        <div className="form">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            required
            onChange={(e) => setLocalUser(e.target.value)}
          />
          <p className={`error ${emailInputClass}`}>{emailError}</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <label htmlFor="contrasena">Contraseña:</label>
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              id="contrasena"
              name="contrasena"
              required
              onChange={(e) => setlocalPassword(e.target.value)}
            />
            <br />
            <br />
            <br />
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
            <br />
            <br />
          </div>
          <p className={`error ${passwordInputClass}`}>{passwordError}</p>
          <button className="enviar" onClick={test}>
            Iniciar sesión
          </button>

          <div className="googleAuth">
            <GoogleLogin 
              clientId="173629652834-49cdcatljk2nkkmhs2qsbq57rt2slhvs.apps.googleusercontent.com"
              buttonText="Inicia sesión con Google"
              onSuccess={responseGoogleS}
              onFailure={responseGoogleE}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <br />
          <p className={`error ${credentialInputClass}`}>{credentialError}</p>
        </div>
      </div>

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
    </div>
  );
};
