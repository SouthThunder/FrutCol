import React, { useEffect, useRef, useState } from "react";
import "./interfaz_admin.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import LoadingSpinner from "../loading/LoadingSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const URI = "https://frutcol-backend-r3lq.onrender.com/metadata/";
const numeros = /^\d+$/; // Solo números
const texto = /^[A-Za-zÁ-ÿ0-9\s]+$/;

const regexHexadecimal = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const regexNombreArchivo = /^[A-Za-z0-9]+.*\.(jpg|jpeg|png|gif|bmp)$/;

export const Agregarproducto = (prop) => {
  const headers = prop.headers;
  const handleAgregar = async () => {
    try {
      let nombre_producto = document.getElementById("nombre")?.value || "";
      let descripcion_producto =
        document.getElementById("descripcion")?.value || "";
      let stock_producto = document.getElementById("cantidad")?.value || "";
      let precio_producto = document.getElementById("precio")?.value || "";
      let main_color = document.getElementById("principalc")?.value || "";
      let comp_color = document.getElementById("compc")?.value || "";
      let header_color = document.getElementById("headerc")?.value || "";
      let font_color = document.getElementById("fontc")?.value || "";
      let image = document.getElementById("image")?.value || "";
      let peso_producto = document.getElementById("peso")?.value || "";

      if (image === "" || !regexNombreArchivo.test(image)) {
        toast.error("Ingrese un nombre de imagen válido (png,jpg,jpeg,bmp)");
        return;
      }

      if (nombre_producto === "" || !texto.test(nombre_producto)) {
        toast.error("Ingrese un nombre válido");
        return;
      }

      if (stock_producto === "" || !numeros.test(stock_producto)) {
        toast.error("Ingrese una cantidad válida");
        return;
      }

      if (precio_producto === "" || !numeros.test(precio_producto)) {
        toast.error("Ingrese un precio válido");
        return;
      }
      if (main_color === "" || !regexHexadecimal.test(main_color)) {
        toast.error("Ingrese un código hexadecimal de Principal válido");
        return;
      }
      if (header_color === "" || !regexHexadecimal.test(header_color)) {
        toast.error("Ingrese un código hexadecimal de header y footer válido");
        return;
      }
      if (comp_color === "" || !regexHexadecimal.test(comp_color)) {
        toast.error("Ingrese un código hexadecimal de Componentes válido");
        return;
      }

      if (font_color === "" || !regexHexadecimal.test(font_color)) {
        toast.error("Ingrese un código hexadecimal de mancha válido");
        return;
      }

      const producto = {
        main_color,
        font_color,
        header_color,
        comp_color,
        image,
        nombre_producto,
        descripcion_producto,
        stock_producto,
        precio_producto,
        peso_producto
      };
      console.log(producto);
      await axios.post(`${URI}`, producto, {
        headers,
      });

      toast.success("Se agregó el producto correctamente");
      prop.onSelectOption("productos");
    } catch (error) {
      console.error(error);
      toast.error("Error agregar el producto");
    }
  };
  return (
    <div className="agregar_container">
      <div className="agregar_producto">
        <div className="left">
          <div className="input__info">
            <h3>Ruta de imagen</h3>
            <input
              className=""
              type="text"
              name=""
              id="image"
              placeholder="image.jpg"
            />
          </div>

          <div className="input__info">
            <h3>Nombre del Producto</h3>
            <input
              className=""
              type="text"
              name=""
              id="nombre"
              placeholder="fresa,mora.."
            />
          </div>
          <div className="input__info">
            <h3>Descripción</h3>
            <textarea
              className=""
              type="text"
              id="descripcion"
              placeholder="Sabor..."
            />
          </div>
        </div>
        <div className="right">
          <div className="input__info">
            <h4>Cantidad</h4>
            <input
              className=""
              type="text"
              name=""
              id="cantidad"
              placeholder="Cantidad en stock"
            />
          </div>
          <div className="input__info">
            <h4>Precio</h4>
            <input
              className=""
              type="text"
              name=""
              id="precio"
              placeholder="Precio en COP"
            />
          </div>
          <div className="input__info">
            <h4>Peso en gramos</h4>
            <input
              className=""
              type="text"
              name=""
              id="precio"
              placeholder="Peso en gramos"
            />
          </div>
          <div className="producto_estilo">
            <h4>Colores de la página</h4>
            <div className="colores_producto">
              <div className="input__info">
                <h5>Principal</h5>
                <input
                  className=""
                  type="text"
                  name=""
                  id="principalc"
                  placeholder="#...."
                />
              </div>
              <div className="input__info">
                <h5>Header y Footer</h5>
                <input
                  className=""
                  type="text"
                  name=""
                  id="headerc"
                  placeholder="#...."
                />
              </div>
              <div className="input__info">
                <h5>Componentes</h5>
                <input
                  className=""
                  type="text"
                  name=""
                  id="compc"
                  placeholder="#...."
                />
              </div>
              <div className="input__info">
                <h5>Mancha</h5>
                <input
                  className=""
                  type="text"
                  name=""
                  id="fontc"
                  placeholder="#...."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="enter agregar_product">
        <button onClick={handleAgregar}>Agregar</button>
      </div>
      <Toaster richColors/>
    </div>
  );
};

export const Editarproducto = (prop) => {
  const headers = prop.headers;

  useEffect(() => {}, []);
  const handleActualizar = async () => {
    try {
      let nombre_producto = document.getElementById("nombre")?.value || "";
      let descripcion_producto =
        document.getElementById("descripcion")?.value || "";
      let stock_producto = document.getElementById("cantidad")?.value || "";
      let precio_producto = document.getElementById("precio")?.value || "";
      let main_color = document.getElementById("principalc")?.value || "";
      let comp_color = document.getElementById("compc")?.value || "";
      let header_color = document.getElementById("headerc")?.value || "";
      let font_color = document.getElementById("fontc")?.value || "";
      let image = document.getElementById("image")?.value || "";
      let peso_producto = document.getElementById("peso")?.value || "";


      if (nombre_producto !== "" && !texto.test(nombre_producto)) {
        toast.error("Ingrese un nombre válido");

        return;
      } else {
        if (nombre_producto === "") {
          nombre_producto = prop.product.nombre_producto;
        }
      }
      if (descripcion_producto === "") {
        descripcion_producto = prop.product.descripcion_producto;
      }

      if (stock_producto !== "" && !numeros.test(stock_producto)) {
        toast.error("Ingrese una cantidad válida");
        return;
      } else {
        if (stock_producto === "") {
          stock_producto = prop.product.stock_producto;
        }
      }
      if (precio_producto !== "" && !numeros.test(precio_producto)) {
        toast.error("Ingrese un precio válido");
        return;
      } else {
        if (precio_producto === "") {
          precio_producto = prop.product.precio_producto;
        }
      }
      if (main_color !== "" && !regexHexadecimal.test(main_color)) {
        toast.error("Ingrese un código hexadecimal de Principal válido");
        return;
      } else {
        if (main_color === "") {
          main_color = prop.product.main_color;
        }
      }
      if (header_color !== "" && !regexHexadecimal.test(header_color)) {
        toast.error("Ingrese un código hexadecimal de header y footer válido");
        return;
      } else {
        if (header_color === "") {
          header_color = prop.product.header_color;
        }
      }
      if (comp_color !== "" && !regexHexadecimal.test(comp_color)) {
        toast.error("Ingrese un código hexadecimal de Componentes válido");
        return;
      } else {
        if (comp_color === "") {
          comp_color = prop.product.comp_color;
        }
      }
      if (font_color !== "" && !regexHexadecimal.test(font_color)) {
        toast.error("Ingrese un código hexadecimal de mancha válido");
        return;
      } else {
        if (font_color === "") {
          font_color = prop.product.font_color;
        }
      }
      if(image===''){
        image= prop.product.image;
      }
      if(peso_producto===''){
        peso_producto= prop.product.peso_producto;
      }

      const producto = {
        main_color,
        font_color,
        header_color,
        comp_color,
        image,
        nombre_producto,
        descripcion_producto,
        stock_producto,
        precio_producto,
        peso_producto
      };
      await axios.put(`${URI}${prop.product.id_metadata_producto}`, producto, {
        headers,
      });
      toast.success("Los datos se actualizaron correctamente");
      prop.onSelectOption("productos");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar los datos");
    }
  };

  return (
    <div className="editar_container">
      <div className="editarcontent">
        <div className="left">
          <div className="product_image">
            <img
              src={`../../images/${prop.product.image}`}
              alt="product image"
            />
          </div>
          <div className="input__info">
            <h3>Nombre del Producto</h3>
            <input
              className=""
              type="text"
              name=""
              id="nombre"
              placeholder={prop.product.nombre_producto}
            />
          </div>
          <div className="input__info">
            <h3>Ruta de imagen</h3>
            <input
              className=""
              type="text"
              name=""
              id="image"
              placeholder={prop.product.image}
            />
          </div>
        </div>
        <div className="right">
          <div className="input__info">
            <h4>Cantidad</h4>
            <input
              className=""
              type="number"
              name=""
              id="cantidad"
              inputMode="numeric"
              placeholder={prop.product.stock_producto}
            />
          </div>
          <div className="input__info">
            <h4>Precio</h4>
            <input
              className=""
              type="number"
              name=""
              id="precio"
              inputMode="numeric"
              placeholder={prop.product.precio_producto}
            />
          </div>
          <div className="input__info">
            <h4>Peso en gramos</h4>
            <input
              className=""
              type="number"
              name=""
              id="peso"
              inputMode="numeric"
              placeholder={prop.product.peso_producto}
            />
          </div>
          <div className="producto_estilo">
            <h4>Colores de la página</h4>
            <div className="colores_producto">
              <div className="input__info">
                <h5>Principal</h5>
                <input
                  className=""
                  type="text"
                  name=""
                  id="principalc"
                  placeholder={prop.product.main_color}
                />
              </div>
              <div className="input__info">
                <h5>Header y Footer</h5>
                <input
                  className=""
                  type="text"
                  name=""
                  id="headerc"
                  placeholder={prop.product.header_color}
                />
              </div>
              <div className="input__info">
                <h5>Componentes</h5>
                <input
                  className=""
                  type="text"
                  name=""
                  id="compc"
                  placeholder={prop.product.comp_color}
                />
              </div>
              <div className="input__info">
                <h5>Mancha</h5>
                <input
                  className=""
                  type="text"
                  name=""
                  id="fontc"
                  placeholder={prop.product.font_color}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input__description">
        <h3>Descripción</h3>
        <input
          className=""
          type="text"
          id="descripcion"
          placeholder={prop.product.descripcion_producto}
        />
      </div>
      <div className="enter actualizar_product">
        <button onClick={handleActualizar}>Actualizar</button>
      </div>
      <Toaster richColors />
    </div>
  );
};

export const Productos = (prop) => {
  const [products, setProducts] = useState(prop.prod.prodsPool);
  const URI = "https://frutcol-backend-r3lq.onrender.com/metadata/";

  useEffect(() => {
    getProducts();
  }, []);

  const handleEditClick = (product) => {
    prop.onSelectOption("editarproducto");
    prop.onSelectProduct(product);
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(URI);
      setProducts(res.data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const updateCantidad = async (id) => {
    try {
      const confirmacion = window.confirm(
        "¿Quieres realmente eliminar el producto?"
      );

      if (!confirmacion) {
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        console.error(
          "No se encontró el token de autorización en el localStorage."
        );
        return;
      }

      const updatedProduct = {
        id_metadata_producto: id,
        stock_producto: 0,
        // Agrega cualquier otro campo que necesites actualizar
      };

      await axios.put(`${URI}${id}`, updatedProduct, {
        headers: {
          Authorization: `${token}`,
        },
      });
      toast.success("Se elimino el producto");

      getProducts();
      prop.onSelectOption("productos");
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  return (
    <div className="infoproductos">
      <div className="productos">
        <table className="table">
          <thead className="table-primary">
            <tr>
              <th>Producto</th>
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id_metadata_producto}>
                <td>{product.nombre_producto}</td>
                <td>{product.descripcion_producto}</td>
                <td>{product.stock_producto}</td>
                <td>{product.precio_producto}</td>
                <td>
                  <h4
                    className="tablebtn"
                    onClick={() => handleEditClick(product)}
                  >
                    Editar
                  </h4>
                </td>
                <td>
                  <h4
                    className="tablebtn"
                    onClick={() => updateCantidad(product.id_metadata_producto)}
                  >
                    Eliminar
                  </h4>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="enter agregarp">
        <button onClick={() => prop.onSelectOption("agregar")}>Agregar</button>
      </div>
      <Toaster richColors />
    </div>
  );
};

export const Infocontenidos = (prop) => {
  return (
    <div className="contenidos">
      <h4
        onClick={() => prop.onSelectOption("productos")}
        style={{
          backgroundColor:
            prop.selectedOption === "productos" ? "#f2f2f2" : "transparent",
        }}
      >
        Productos
      </h4>
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
  const [selectedOption, setSelectedOption] = useState("productos"); // Por defecto muestra "infocuenta"
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      {selectedOption === "productos" ? (
        <Productos
          onSelectOption={handleOptionChange}
          onSelectProduct={setSelectedProduct}
          selectedOption={selectedOption}
          prod={prop}
        />
      ) : selectedOption === "reservas" ? (
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
      ) : selectedOption === "editarproducto" ? (
        <Editarproducto
          prod={prop}
          product={selectedProduct}
          onSelectOption={handleOptionChange}
          headers={prop.headers}
        />
      ) : selectedOption === "agregar" ? (
        <Agregarproducto
          prod={prop}
          onSelectOption={handleOptionChange}
          headers={prop.headers}
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
    console.log('enter')
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
