import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoEyeOff, IoEye } from "react-icons/io5";
import axios from "axios";
import jwt_decode from "jwt-decode";
import GoogleLogin from "react-google-login";
import Cookies from "js-cookie";
import "./ingreso.css";

const URI = "https://frutcol-backend.onrender.com/usuarios/login";

export const Ingresocom = ({ refresh }) => {
  const [formData, setFormData] = useState({
    localuser: "",
    localpassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    credential: "",
  });

  const [inputClasses, setInputClasses] = useState({
    email: "",
    password: "",
    credential: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResponseGoogleSuccess = async (response) => {
    authToken(response);
  };

  const authToken = async (response) => {
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
      toast.error("No existe una cuenta registrada con este correo.");
      console.error(error);
    }
  };

  const getId = async (token) => {
    const URI = "https://frutcol-backend.onrender.com/carrito/create";
    const headers = {
      Authorization: `${token}`,
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

  const handleResponseGoogleFailure = async (response) => {
    console.log(response.profileObj);
    toast.error("Error al iniciar sesión");
    await new Promise((resolve) => setTimeout(resolve, 2500));
  };

  const handleLogin = async () => {
    // Verificar campos vacíos
    const { localuser, localpassword } = formData;
    const emailError = !localuser ? "Ingrese su correo" : "";
    const passwordError = !localpassword ? "Ingrese su contraseña" : "";

    setErrors({
      email: emailError,
      password: passwordError,
      credential: "",
    });

    setInputClasses({
      email: emailError ? "shake" : "",
      password: passwordError ? "shake" : "",
      credential: "",
    });

    if (emailError || passwordError) {
      return;
    }

    try {
      const res = await axios.post(URI, {
        correo_usuario: localuser,
        contrasena_usuario: localpassword,
      });
      Cookies.set("token", res.data.token);
      navigate("/");
      refresh();
    } catch (error) {
      console.error(error);
      setErrors({
        email: "",
        password: "",
        credential: "Credenciales incorrectas, intente una vez más.",
      });

      setInputClasses({
        email: "",
        password: "",
        credential: "shake",
      });
    }
  };

  return (
    <div className="contderformlogin">
      <div className="form">
        <h1>Inicio de sesión</h1>
        <p>Correo:</p>
        <div className="password">
          <input
            type="email"
            name="localuser"
            onChange={handleFieldChange}
            className={inputClasses.email}
          />
        </div>
        <p className={`error ${inputClasses.email}`}>{errors.email}</p>

        <p>Contraseña:</p>
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            name="localpassword"
            onChange={handleFieldChange}
            className={inputClasses.password}
          />

          <button
            className="invisible"
            type="button"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ?  <IoEye /> : <IoEyeOff />}
          </button>
        </div>
        <p className={`error ${inputClasses.password}`}>{errors.password}</p>
        <div className="send">
          <button className="enviar" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>

        <div className="googleAuth">
          <GoogleLogin
            clientId="336496153339-bfh9gkv3l2ktbgnq5725nba8kp84u5ff.apps.googleusercontent.com"
            buttonText="Inicia sesión con Google"
            onSuccess={handleResponseGoogleSuccess}
            onFailure={handleResponseGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <p className={`error ${inputClasses.credential}`}>
          {errors.credential}
        </p>
        <p className="registro">
          ¿No tienes una cuenta?{" "}
          <span onClick={() => navigate("/registro")} onKeyDown={() => navigate('/registro')}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};
