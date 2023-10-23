import React, { useEffect, useRef, useState } from "react";
import "./interfaz_admin.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import LoadingSpinner from "../loading/LoadingSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI = "https://frutcol-backend-r3lq.onrender.com/metadata/";

export const Infocontenidos = (prop) => {
  return (
    <div className="contenidos">
      <h4
        onClick={() => prop.onSelectOption("reservas")}
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

export const Reservas = (prop) => {
  const handleReservationClick = (reserva) => {
    prop.onSelectOption("productosreserva");
    prop.onSelectReservation(reserva);
  };
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");
  const [numOrden, setNumOrden] = useState("");
  const filtrarReservas = () => {
    return prop.prod.userHistory.filter((userHistory) => {
      // Verificar si se cumple la condición de estado y fecha
      const cumpleCondicionEstado =
        estado === "" || userHistory.estado_reserva.toString() === estado;
      const cumpleCondicionFecha =
        fecha === "" || userHistory.fecha_reserva === fecha;
      const encontroNumOrden = 
        numOrden === "" || userHistory.num_orden === numOrden;
      // Si ambas condiciones se cumplen, se muestra el elemento
      return cumpleCondicionEstado && cumpleCondicionFecha && encontroNumOrden;
    });
  };
  useEffect(() => {}, []);

  return (
    <div className="historialReserva">
      <div className="container">
        <div className="filtro">
          <h2>Filtros:</h2>
          <div className="filtroestado">
            <label>Estado : </label>
            <select
              name="estado"
              id="estado"
              onChange={(e) => setEstado(e.target.value)}
              className="select"
            >
              <option value="">Todo</option>
              <option value="true">Entregado</option>
              <option value="false">En proceso</option>
            </select>
          </div>
          <div className="filtrofecha">
            <label>Fecha: </label>
            <input
              className="entry"
              type="date"
              id="start"
              name="trip-start"
              value={fecha}
              min="2023-01-01"
              max="2035-01-01"
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="search">
            <label>Buscar orden: </label>
            <input type="text" placeholder="FC202310U1S1" onChange={(e) =>{
              setNumOrden(e.target.value);
            }}/>
          </div>
        </div>
        <div className="labels">
          <div className="lItem">
            <p># Reserva</p>
          </div>
          <div className="lItem">
            <p>Número de productos </p>
          </div>
          <div className="lItem">
            <p>Fecha</p>
          </div>
          <div className="lItem">
            <p>Valor total</p>
          </div>
          <div className="lItem">
            <p>Estado</p>
          </div>
        </div>
        {filtrarReservas().map((userHistory) => {
          const chkStatus = () => {
            if (userHistory.estado_reserva === false) {
              return <li style={{ color: "#ff8c00" }}>En proceso</li>;
            } else {
              return <li style={{ color: "green" }}>Entregado</li>;
            }
          };

          return (
            <ul
              className="orders"
              key={userHistory.num_orden}
              onClick={() => handleReservationClick(userHistory)}
            >
              <div className="lItem">
                <li>{userHistory.num_orden}</li>
              </div>
              <div className="lItem">
                <li>{userHistory.num_productos_reserva}</li>
              </div>
              <div className="lItem">
                <li>{userHistory.fecha_reserva}</li>
              </div>
              <div className="lItem">
                <li>{userHistory.valor_reserva}</li>
              </div>
              <div className="lItem">
                <li>{chkStatus()}</li>
              </div>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export const ProductosReserva = (prop) => {
  const URI = `https://frutcol-backend-r3lq.onrender.com/reserprod/${prop.reservation.num_orden}`;
  const URI2 = `https://frutcol-backend-r3lq.onrender.com/reserva/${prop.reservation.num_orden}`;
  const [products, setProducts] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const firstRender = useRef(true);
  const metadata = prop.prodsPool;
  const accessToken = localStorage.getItem("token");
  const headers = {
    Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
  };
  useEffect(() => {
    if (firstRender.current) {
      getProducts();
      getUserData();
      firstRender.current = false;
    } else {
      if (products !== null && userData !== null) {
        setisLoading(false);
      }else{
        setisLoading(true);
      }
    }
  }, [products, userData]);

  const getProducts = async () => {
    try {
      const res = await axios.get(URI, { headers });
      setProducts(res.data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get(URI2, { headers });
      setUserData(res.data.Usuario);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const handleEntregarOrden = async () => {
    const URI = `https://frutcol-backend-r3lq.onrender.com/reserva/${prop.reservation.num_orden}`;
    try {
      await axios.put(
        URI,
        {
          id_reserva: prop.reservation.id_reserva,
          id_usuario: prop.reservation.id_usuario,
          num_productos_reserva: prop.reservation.num_productos_reserva,
          valor_reserva: prop.reservation.valor_reserva,
          fecha_reserva: prop.reservation.fecha_reserva,
          num_orden: prop.reservation.num_orden,
          estado_reserva: true,
        },
        { headers }
      );
      window.location.reload(false);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const checkNotProcessed = () => {
    if (!prop.reservation.estado_reserva) {
      return (
        <div className="control">
          <button onClick={() => handleEntregarOrden()}>Entregar orden</button>
        </div>
      );
    } else {
      return;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="reserva">
      <h2>Número de orden: {prop.reservation.num_orden}</h2>
      <div className="resuser">
        <h3>Información de Usuario</h3>
        <div className="grid">
          <div className="r1">
            <div className="c1">
              <p>
                <strong>Cédula:</strong> {userData.cedula_usuario}
              </p>
            </div>
            <div className="c2">
              <p>
                <strong>Correo:</strong> {userData.correo_usuario}
              </p>
            </div>
            <div className="c3">
              <p>
                <strong>Dirección:</strong> {userData.direccion_usuario}
              </p>
            </div>
          </div>
          <div className="r2">
            <div className="c1">
              <p>
                <strong>Nombre:</strong> {userData.nombre_usuario}
              </p>
            </div>
            <div className="c2">
              <p>
                <strong>Apellido:</strong> {userData.apellido_usuario}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="resprod">
        <h3>Productos</h3>
        <div className="elements">
          <div className="labels">
            <div className="lItem">
              <p>Producto</p>
            </div>
            <div className="lItem">
              <p>Cantidad</p>
            </div>
            <div className="lItem">
              <p>Valor</p>
            </div>
          </div>
          {products?.map((products) => {
            const matchingProduct = metadata.find(
              (prod) => prod.id_metadata_producto === products.id_producto
            );
            return (
              <div className="product" key={products.id_producto}>
                <div className="pImg">
                  <div className="title">
                    <h3>{matchingProduct.nombre_producto}</h3>
                  </div>
                  <img
                    src={"../../images/" + matchingProduct.image}
                    alt={matchingProduct.nombre_producto}
                  />
                </div>
                <div className="promt">
                  <p>Cantidad: {products.cantidad_producto}</p>
                </div>
                <div className="unit">
                  <p>$ {matchingProduct.precio_producto} c/u</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="separator"></div>
        <div className="total">
          <p>
            <strong>Total:</strong> {prop.reservation.valor_reserva}
          </p>
        </div>
      </div>
      {checkNotProcessed()}
    </div>
  );
};

export const InterfazAdmincom = ({ product, prodsPool}) => {
  const [isLoading, setisLoading] = useState(true);
  const [userHistory, setUserHistory] = useState(null);
  const [admin, setAdming] = useState(null);
  const firstRender = useRef(true);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");
  const headers = {
    Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
  };

  useEffect(() => {
    if (firstRender.current) {
      getHistoryData();
      getAdmin();
      document.documentElement.style.setProperty(
        "--background-btn",
        product.main_color
      );
      document.documentElement.style.setProperty(
        "--btn-color",
        product.header_color
      );
      firstRender.current = false;
    } else {
      if (prodsPool !== null && userHistory !== null && admin !== null) {
        console.log(userHistory)
        setisLoading(false);
      }
    }
  }, [userHistory, admin]);

  const getHistoryData = async () => {
    const lURI = "https://frutcol-backend-r3lq.onrender.com/reserva/";
    try {
      const res = await axios.get(lURI, { headers });
      setUserHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAdmin = async () => {
    const lURI = "https://frutcol-backend-r3lq.onrender.com/usuarios";
    try {
      const res = await axios.get(lURI, { headers });
      setAdming(res.data);
    } catch (error) {
      setAdming(false);
      console.error(error);
    }
  };

  if (isLoading && admin === null) {
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
  }else if(admin === true) {
    return (
      <div className="infopagecontain">
        <Headercom
          product={product}
        />
        <Informacionpagina
          product={product}
          headers={headers}
          prodsPool={prodsPool}
          userHistory={userHistory}
        />
        <Footercom product={product} />
      </div>
    );
  }
};
