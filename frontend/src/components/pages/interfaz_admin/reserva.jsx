import { useState, useEffect } from "react";

export const Reservas = (prop) => {
    const handleReservationClick = (reserva) => {
      prop.onSelectOption("productosreserva");
      prop.onSelectReservation(reserva);
    };
    const [estado, setEstado] = useState("");
    const [fecha, setFecha] = useState("");
    const [numOrden, setNumOrden] = useState("");
    const [loader, setLoader] = useState(true);
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
    useEffect(() => {
      if (prop.prod.userHistory !== null) {
        setLoader(false);
      }
    }, [prop.prod.userHistory]);
  
    if (loader) {
      return;
    }
  
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
              <input
                type="text"
                placeholder="FC202310U1S1"
                onChange={(e) => {
                  setNumOrden(e.target.value);
                }}
              />
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
                onKeyDown={() => handleReservationClick(userHistory)}
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
  