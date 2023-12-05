import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../common/loading/LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { getAllOrders } from "../../../services/reserva.js";
import { Reservas } from "./reserva.jsx";
import { ProductosReserva } from "./prodReserva.jsx";
import "./interfaz_admin.css";

export const Infocontenidos = (prop) => {
  return (
    <div className="contenidos">
      <h4
        onClick={() => prop.onSelectOption("reservas")}
        onKeyDown={() => prop.onSelectOption("reservas")}
        style={{
          backgroundColor:
            prop.selectedOption === "reservas" ? "#f2f2f2" : "transparent",
        }}
      >
        Reservas
      </h4>
    </div>
  );
};
export const Informacionpagina = (prop) => {
  const [selectedOption, setSelectedOption] = useState("reservas"); // Por defecto muestra "infocuenta"
  useEffect(() => {}, []);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="info_pagina">
      <Infocontenidos
        onSelectOption={handleOptionChange}
        selectedOption={selectedOption}
      />
      {selectedOption === "reservas" ? (
        <Reservas
          onSelectOption={handleOptionChange}
          onSelectReservation={setSelectedReservation}
          selectedOption={selectedOption}
          prod={prop}
        />
      ) : selectedOption === "productosreserva" ? (
        <ProductosReserva
          onSelectOption={handleOptionChange}
          reservation={selectedReservation}
          selectedOption={selectedOption}
          prod={prop}
          prodsPool={prop.prodsPool}
        />
      ) : null}
    </div>
  );
};



export const InterfazAdmincom = ({ prodsPool }) => {
  const [loading, setLoading] = useState(true);
  const [userHistory, setUserHistory] = useState(null);
  const [admin, setAdmin] = useState(null);
  const firstRender = useRef(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (firstRender.current) {
      getHistoryData();
      firstRender.current = false;
    } else {
      if (prodsPool !== null && userHistory !== null) {
        if (user.role === "superusuario") {
          setAdmin(true);
        }
        setLoading(false);
      }
    }
  }, [userHistory, admin]);

  const getHistoryData = async () => {
    try {
      const res = await getAllOrders(Cookie.get("token"));
      setUserHistory(res);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading && admin === null) {
    return <LoadingSpinner />;
  } else if (admin === false) {
    return (
      <div className="notAuthorized">
        <div className="container">
          <h1>Acceso no autorizado, verifique sus permisos</h1>
          <button onClick={() => navigate("/")}>Volver</button>
        </div>
      </div>
    );
  } else if (admin === true) {
    return (
      <Informacionpagina prodsPool={prodsPool} userHistory={userHistory} />
    );
  }
};
