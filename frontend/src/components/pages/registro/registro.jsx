import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "./registro.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    for (const key in formData) {
      if (!formData[key]) {
        setFormError("Por favor, llena todos los campos vacíos.");
        return;
      }
    }
    if (!termsAccepted) {
      setFormError("Debes aceptar los términos y condiciones.");
      return;
    }
    if (!isEmailValid(formData.correo)) {
      setFormError("El formato del correo electrónico no es válido.");
      return;
    }
    setFormError("");
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
    <div className="contderformlogin">
      <div className="form">
        <h1>Registro</h1>
        <p htmlFor="nombre">Nombre:</p>
        <div className="password">
          <input
            type="text"
            id="nombre"
            name="nombre"
            onChange={handleInputChange}
            value={formData.nombre}
          />
        </div>

        <p htmlFor="apellido">Apellido:</p>
        <div className="password">
          <input
            type="text"
            id="apellido"
            name="apellido"
            onChange={handleInputChange}
            value={formData.apellido}
          />
        </div>

        <p htmlFor="cedula">Cédula:</p>
        <div className="password">
          <input
            type="number"
            id="cedula"
            name="cedula"
            inputMode="numeric"
            onChange={handleInputChange}
            value={formData.cedula}
          />
        </div>

        <p htmlFor="direccion">Dirección:</p>
        <div className="password">
          <input
            type="text"
            id="direccion"
            name="direccion"
            onChange={handleInputChange}
            value={formData.direccion}
          />
        </div>

        <p htmlFor="correo">Correo:</p>
        <div className="password">
          <input
            type="email"
            id="correo"
            name="correo"
            onChange={handleInputChange}
            value={formData.correo}
          />
        </div>

        <p htmlFor="contrasena">Contraseña:</p>
        <div className="password">
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            onChange={handleInputChange}
            value={formData.contrasena}
          />
        </div>
        <div className="terms_coditions">
          <input
            type="checkbox"
            name="terminos&condiciones"
            onChange={() => setTermsAccepted(!termsAccepted)}
            checked={termsAccepted}
          />
          <p htmlFor="terminos&condiciones">
            He leído y acepto los{" "}
            <Link to="/Privacidad">términos y condiciones</Link>
          </p>
        </div>
        {formError && <p className="error">{formError}</p>}

        <div className="send">
          <button className="enviar" onClick={handleSubmit}>
            Registrarse
          </button>
        </div>
        <div className="googleAuth">
          <GoogleLogin
            clientId="336496153339-bfh9gkv3l2ktbgnq5725nba8kp84u5ff.apps.googleusercontent.com"
            buttonText="Registrate con Google"
            onSuccess={responseGoogleS}
            onFailure={responseGoogleE}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <p className="registro">
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => navigate("/ingreso")} onKeyDown={() => navigate('/ingreso')}>Inicia Sesión</span>
        </p>
      </div>

      <Toaster richColors />
    </div>
  );
};
