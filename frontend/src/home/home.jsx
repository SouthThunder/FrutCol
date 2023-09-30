import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./slider.css";
import "./products.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import { Producto } from "./cartSlice";
import { useNavigate } from "react-router-dom";

export const Slider = ({ product, changeProp, prodsPool }) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [primaryColor, setPrimaryColor] = useState([]);
  const [currentImageback, setCurrentImageback] = useState([]);
  const [currentWord, setCurrentWord] = useState([]);
  const [currentPrice, setCurrentprice] = useState([]);

  const changestyle = (element) => {
    setBackgroundColor(element.comp_color);
    setPrimaryColor(element.main_color);
    setCurrentImage(`../../images/${product.image}`);
    setCurrentImageback(`../../images/${product.stain_image}`);
    setCurrentWord(element.nombre_producto);
    setCurrentprice(element.precio_producto);
  };
  const updateProp = (element) => {
    changeProp(element);
  };

  useEffect(() => {
    if (product !== null) {
      changestyle(product);
    }
  }, [product]);
  const handleAddToCart = () => {
    // Realiza cualquier acción relacionada con agregar al carrito aquí

    // Obtén la referencia al elemento con el ancla '#products'
    const productsAnchor = document.querySelector('#products');

    if (productsAnchor) {
      // Usa scrollIntoView con el comportamiento de desplazamiento suave
      productsAnchor.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const incrementArray = (step) => {
    const newIndex =
      (activeProductIndex + step + prodsPool.length) % prodsPool.length;
    setActiveProductIndex(newIndex);
    const nextProduct = prodsPool[newIndex];
    changestyle(nextProduct);
    updateProp(nextProduct);
  };

  return (
    <div
      className="slider"
      style={{ backgroundColor, transition: "all 1s var(--btn-cubic-bezier)" }}
    >
      <div className="first">
        <div className="n1">
          <h1>
            Pulpa de <br /> {currentWord}
          </h1>
        </div>
        <div className="n2">
          <h1>$ {currentPrice} c/u</h1>
        </div>
        <div className="n3">
          <button
          onClick={handleAddToCart}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = primaryColor)
            }
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFF")}
          >
            + Añadir al carrito
          </button>
        </div>
        <div className="n4">
          <p>0{activeProductIndex+1}</p>
          <input type="range" min={0} max={100} step={20} value={(activeProductIndex+1)*20} disabled className="progress" style={{ backgroundImage: `linear-gradient(${primaryColor}, ${primaryColor})`, backgroundSize: `${(activeProductIndex+1)*20}% 100%`, transition: 'all 1s var(--btn-cubic-bezier)'}}></input>
          <p>0{prodsPool.length}</p>
        </div>
      </div>

      <div className="second">
        <img src={currentImageback} alt="" />
        <img src={currentImage} alt="" />
      </div>

      <div className="third">
        <div className="n1">
          <h1>Apasionante y Natural</h1>
          <h3>
            Pulpa de fruta 100% <div className="test">natural</div>
          </h3>
        </div>
        <div className="n2">
          <button
            onClick={() => incrementArray(-1)}
            style={{
              color: primaryColor,
              transition: "all 1s var(--btn-cubic-bezier)",
            }}
          >
            &#60;
          </button>
          <button
            onClick={() => incrementArray(1)}
            style={{
              backgroundColor: primaryColor,
              transition: "all 1s var(--btn-cubic-bezier)",
            }}
          >
            &#62;
          </button>
        </div>
        <div className="n3">
          <div className="products__preview">
            {prodsPool?.map((element) => {
              return (
                <button
                  key={element.id_metadata_producto}
                  className="fruit"
                  onClick={() => {
                    setActiveProductIndex(element.id_metadata_producto - 1);
                    updateProp(element);
                  }}
                >
                  <div className="fruit__container">
                    <img src={`../../images/${element.image}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProdsComp = ({ product, headers, loged }) => {
  const [element, setElement] = useState(product);
  const [test, setTest] =useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [test]);

  const handleResCantidad = () => {
    if (element.cantidad === 1) {
      element.delProd(headers);
      setTest(!test)
    } else {
      element.resCantidad(headers);
      setTest(!test)
    }
  };

  const handleSumCantidad = () => {
    element.sumCantidad(headers);
    setTest(!test)
  };

  const controls = (
    <div className="controls">
      <div className="panel">
        <button onClick={() => handleResCantidad()}>-</button>
        <p>{element.cantidad}</p>
        <button onClick={() => handleSumCantidad()}>+</button>
      </div>
      <div className="value">
        <p>$ {element.calcularPrecioTotal()}</p>
      </div>
    </div>
  );

  const noControls = () => {
    return (
      <div className="noControls">
        {
          loged? (
            <button onClick={() => {
              if(element.exists){
                element.sumCantidad(headers);
              }else{
                element.insertIntoDb(headers)
              }
              setTest(!test)
            }}>+ Añadir al carrito</button>
          ) : <button onClick={() => navigate('/Ingreso')}>+ Añadir al carrito</button>

        }
      </div>
    );
  };

  const fDisplay = () => {
    if (element.cantidad === 0) {
      return noControls();
    } else {
      return controls;
    }
  };

  return (
    <div className="card" key={element.id_producto}>
      <div className="title">
        <div className="promt">
          <p>{element.nombre}</p>
        </div>
        <div className="unit">
          <div className="container">
            <p>$ {element.precio} c/u</p>
          </div>
        </div>
      </div>
      <div className="pImg">
        <img src={"../../images/" + element.image} alt={element.nombre} />
      </div>
      {fDisplay()}
    </div>
  );
};

export const Products = ({ prodsPool }) => {
  const [isLoading, setisLoading] = useState(true);
  const [lProductos, setLProductos] = useState(null);
  const [user, setUser] = useState();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      if (
        localStorage.getItem("token") === undefined ||
        localStorage.getItem("token") === null
      ) {
        setUser(false);
        getProducts();
      } else {
        setUser(true);
        getProductsFromCart();
      }
      firstRender.current = false;
    } else {
      if (lProductos !== null) {
        setisLoading(false);
      }
    }
  }, [lProductos]);

  const accessToken = localStorage.getItem("token");
  const headers = {
    Authorization: `${accessToken}`, // Agrega "Bearer" antes del token si es necesario
  };

  const getProducts = () => {
    setLProductos(() =>
      prodsPool.map((prod) => {
        return new Producto(
          prod.id_metadata_producto,
          prod.nombre_producto,
          prod.precio_producto,
          0,
          prod.image
        );
      })
    );
  };

  const getProductsFromCart = async () => {
    const id_carrito = jwt_decode(localStorage.getItem("token"));
    const URI = `https://frutcol-backend.onrender.com/carrito/${id_carrito.id_usuario}`;
    try {
      const res = await axios.get(URI, {
        headers,
      });
      setLProductos(() =>
        prodsPool.map((prod) => {
          const it = res.data.find(
            (lproduc) => lproduc.id_producto === prod.id_metadata_producto
          );
          if (it === undefined) {
            return new Producto(
              prod.id_metadata_producto,
              prod.nombre_producto,
              prod.precio_producto,
              0,
              prod.image,
              false
            );
          } else {
            return new Producto(
              it.id_producto,
              prod.nombre_producto,
              prod.precio_producto,
              it.cantidad_producto,
              prod.image,
              true
            );
          }
        })
      );
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="productsComp" id="products">
      <div className="title">
        <h1>Productos</h1>
      </div>
      <div className="elements">
        {lProductos?.map((prods) => {
          return <ProdsComp product={prods} headers={headers} loged={user}/>;
        })}
      </div>
    </div>
  );
};

export const Homecom = ({product, changeProp, prodsPool}) => {

  return (
    <div className="homecontain">
      <Headercom product={product} />
      <Slider product={product} changeProp={changeProp} prodsPool={prodsPool} />
      <Products prodsPool={prodsPool} />
      <Footercom product={product} />
    </div>
  );
};
