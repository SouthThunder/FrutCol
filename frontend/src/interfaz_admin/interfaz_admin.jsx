import React, { useEffect, useState } from "react";
import "./interfaz_admin.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import axios from "axios";
import { Link } from "react-router-dom";

const accessToken = localStorage.getItem("token");
const URI = "https://frutcola-backendpru.onrender.com/metadata/";
const numeros = /^\d+$/; // Solo números
const texto = /^[A-Za-zÁ-ÿ\s]+$/; // Solo letras y espacios

const regexHexadecimal = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const regexNombreArchivo = /^[A-Za-z0-9]+.*\.(jpg|jpeg|png|gif|bmp)$/;
const headers = {
  Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
};

export const Agregarproducto = (prop) => {
  const handleAgregar = async () => {
    try {
      var nombre_producto = document.getElementById("nombre")?.value || "";
      var descripcion_producto = document.getElementById("descripcion")?.value || "";
      var stock_producto = document.getElementById("cantidad")?.value || "";
      var precio_producto = document.getElementById("precio")?.value || "";
      var main_color = document.getElementById("principalc")?.value || "";
      var comp_color = document.getElementById("compc")?.value || "";
      var header_color = document.getElementById("headerc")?.value || "";
      var font_color = document.getElementById("fontc")?.value || "";
      var image = document.getElementById("image")?.value || "";
      var stain_image = document.getElementById("stain_image")?.value || "";

      if (image === "" || !regexNombreArchivo.test(image)) {
        alert("Ingrese un nombre de imagen válido (png,jpg,jpeg,bmp)");
        return;
      }
      if (stain_image === "" || !regexNombreArchivo.test(stain_image)) {
        alert("Ingrese un nombre de imagen stain válido (png,jpg,jpeg,bmp)");
        return;
      }

      if (nombre_producto === "" || !texto.test(nombre_producto)) {
        alert("Ingrese un nombre válido");
        return;
      }

      if (stock_producto === "" || !numeros.test(stock_producto)) {
        alert("Ingrese una cantidad válida");
        return;
      }

      if (precio_producto === "" || !numeros.test(precio_producto)) {
        alert("Ingrese un precio válido");
        return;
      }
      if (main_color === "" || !regexHexadecimal.test(main_color)) {
        alert("Ingrese un código hexadecimal de Principal válido");
        return;
      }
      if (header_color === "" || !regexHexadecimal.test(header_color)) {
        alert("Ingrese un código hexadecimal de header y footer válido");
        return;
      }
      if (comp_color === "" || !regexHexadecimal.test(comp_color)) {
        alert("Ingrese un código hexadecimal de Componentes válido");
        return;
      }

      if (font_color === "" || !regexHexadecimal.test(font_color)) {
        alert("Ingrese un código hexadecimal de letra válido");
        return;
      }

      const producto = {
        main_color,
        font_color,
        header_color,
        comp_color,
        image,
        stain_image,
        nombre_producto,
        descripcion_producto,
        stock_producto,
        precio_producto,
      };
      console.log(producto);
      await axios.post(`${URI}`, producto, {
        headers,
      });

      alert("Se agregó el producto correctamente");
      prop.onSelectOption("productos");
    } catch (error) {
      console.error(error);
      alert("Error agregar el producto");
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
            <h3>Ruta imagen stain</h3>
            <input
              className=""
              type="text"
              name=""
              id="stain_image"
              placeholder="stain_image.jpg"
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
          <div className="producto_estilo">
            <h4>Colores</h4>
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
                <h5>Letra</h5>
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
    </div>
  );
};

export const Editarproducto = (prop) => {

  const handleActualizar = async () => {
    try {
      var nombre_producto = document.getElementById("nombre")?.value || "";
      var descripcion_producto = document.getElementById("descripcion")?.value || "";
      var stock_producto = document.getElementById("cantidad")?.value || "";
      var precio_producto = document.getElementById("precio")?.value || "";
      var main_color = document.getElementById("principalc")?.value || "";
      var comp_color = document.getElementById("compc")?.value || "";
      var header_color = document.getElementById("headerc")?.value || "";
      var font_color = document.getElementById("fontc")?.value || "";
      var image = prop.product.image;
      var stain_image = prop.product.stain_image;

      if (nombre_producto !== "" && !texto.test(nombre_producto)) {
        alert("Ingrese un nombre válido");
        
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
        alert("Ingrese una cantidad válida");
        return;
      } else {
        if (stock_producto === "") {
          stock_producto = prop.product.stock_producto;
        }
      }
      if (precio_producto !== "" && !numeros.test(precio_producto)) {
        alert("Ingrese un precio válido");
        return;
      } else {
        if (precio_producto === "") {
          precio_producto = prop.product.precio_producto;
        }
      }
      if (main_color !== "" && !regexHexadecimal.test(main_color)) {
        alert("Ingrese un código hexadecimal de Principal válido");
        return;
      } else {
        if (main_color === "") {
          main_color = prop.product.main_color;
        }
      }
      if (header_color !== "" && !regexHexadecimal.test(header_color)) {
        alert("Ingrese un código hexadecimal de header y footer válido");
        return;
      } else {
        if (header_color === "") {
          header_color = prop.product.header_color;
        }
      }
      if (comp_color !== "" && !regexHexadecimal.test(comp_color)) {
        alert("Ingrese un código hexadecimal de Componentes válido");
        return;
      } else {
        if (comp_color === "") {
          comp_color = prop.product.comp_color;
        }
      }
      if (font_color !== "" && !regexHexadecimal.test(font_color)) {
        alert("Ingrese un código hexadecimal de letra válido");
        return;
      } else {
        if (font_color === "") {
          font_color = prop.product.font_color;
        }
      }

      const producto = {
        main_color,
        font_color,
        header_color,
        comp_color,
        image,
        stain_image,
        nombre_producto,
        descripcion_producto,
        stock_producto,
        precio_producto,
      };
      await axios.put(`${URI}${prop.product.id_metadata_producto}`, producto, {
        headers,
      });
      alert("Los datos se actualizaron correctamente");
      prop.onSelectOption("productos");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar los datos");
    }
  };

  return (
    <div className="editar_container">
      <div className="editarcontent">
        <div className="left">
          <div className="product_image">
            <img src={prop.product.image} alt="" />
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
            <h3>Descripción</h3>
            <textarea
              className=""
              type="text"
              id="descripcion"
              placeholder={prop.product.descripcion_producto}
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
          <div className="producto_estilo">
            <h4>Colores</h4>
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
                <h5>Letra</h5>
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
      <div className="enter actualizar_product">
        <button onClick={handleActualizar}>Actualizar</button>
      </div>
    </div>
  );
};
export const Productos = (prop) => {
  const [products, setProducts] = useState([]);
  const [promt, setPromt] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const checkPromt = () => {
    if (prop.promt === undefined || prop.promt === null) {
      setPromt("Productos");
    } else {
      setPromt(prop.promt);
    }
  };
  const handleEditClick = (product) => {
    // Cuando se hace clic en "Editar", actualiza el producto seleccionado
    // y cambia la opción seleccionada a "editarproducto"
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
  const deleteProducto = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este producto?"
    );
    if (confirmacion) {
      await axios.delete(`${URI}${id}`, {
        headers,
      });
      getProducts();
      prop.onSelectOption("productos");
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
                    onClick={() => deleteProducto(product.id_metadata_producto)}
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
      <h4
        onClick={() => prop.onSelectOption("dashboard")}
        style={{
          backgroundColor:
            prop.selectedOption === "dashboard" ? "#f2f2f2" : "transparent",
        }}
      >
        Dashboard
      </h4>
    </div>
  );
};
export const Informacionpagina = (prop) => {
  const [selectedOption, setSelectedOption] = useState("productos"); // Por defecto muestra "infocuenta"
  const [selectedProduct, setSelectedProduct] = useState(null);
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
        <Reservas prod={prop} />
      ) : selectedOption === "dashboard" ? (
        <Dashboard prod={prop} />
      ) : selectedOption === "editarproducto" ? (
        <Editarproducto
          prod={prop}
          product={selectedProduct}
          onSelectOption={handleOptionChange}
        />
      ) : selectedOption === "agregar" ? (
        <Agregarproducto prod={prop} onSelectOption={handleOptionChange} />
      ) : null}
    </div>
  );
};

export const Reservas = (prop) => {
  return <h4>SOY RESERVAS</h4>;
};
export const Dashboard = (prop) => {
  return <h4>SOY DASHBOARD</h4>;
};

export const InterfazAdmincom = ({product}) => {

  return (
    <div className="infopagecontain">
      <Headercom product={product} />
      <Informacionpagina product={product} />
      <Footercom product={product} />
    </div>
  );
};
