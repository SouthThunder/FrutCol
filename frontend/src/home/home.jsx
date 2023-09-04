import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./slider.css";
import "./products.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import { Producto } from "./cartSlice";
import LoadingSpinner from '../loading/LoadingSpinner'

export const Slider = ({ product, changeProp, prodsPool }) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [primaryColor, setPrimaryColor] = useState([]);
  const [currentImageback, setCurrentImageback] = useState([]);
  const [currentWord, setCurrentWord] = useState([]);
  const [currentPrice, setCurrentprice] = useState([]);

  const changestyle = ( element) => {
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
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = primaryColor)
            }
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFF")}
          >
            + Añadir al carrito
          </button>
        </div>
        <div className="n4">
          <p>01</p>
          <span className="progress" style={{ color: primaryColor }}></span>
          <p>05</p>
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
                    changestyle(
                      element.comp_color,
                      element.main_color,
                      `../../images/${element.image}`,
                      `../../images/${element.stain_image}`,
                      element.nombre_producto,
                      element.precio_producto
                    );
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

export const Products = ({prodsPool}) => {
  const URI = "https://frutcola-backendpru.onrender.com/metadata";
  const [products, setProducts] = useState([]);
  const [test, setTest] = useState({
    producto: [],
  });

  useEffect(() => {
    getProducts();
  }, [test.producto]);

  const getProducts = async () => {
    const id_carrito = jwt_decode(localStorage.getItem("token"));
    const idk = `https://frutcola-backendpru.onrender.com/carrito/${id_carrito.id_usuario}`;
    try {
      const res = await axios.get(URI);
      const res2 = await axios.get(idk);
      setProducts(res.data);
      setTest({
        producto: prodsPool.map((prod) => {
          const it = res2.data.find(
            (lproduc) => lproduc.id_producto === prod.id_metadata_producto
          );
          if (it === undefined) {
            return new Producto(
              prod.id_metadata_producto,
              prod.nombre_producto,
              prod.precio_producto,
              0
            );
          } else {
            return new Producto(
              it.id_producto,
              prod.nombre_producto,
              prod.precio_producto,
              it.cantidad_producto
            );
          }
        }),
      });
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const handleResCantidad = (element) => {
    const updatedProductos = test.producto.map((prod) => {
      if (prod.nombre === element.nombre_producto) {
        if (prod.cantidad === 1) {
          prod.delProd();
        } else {
          prod.resCantidad();
        }
      }
      return prod;
    });
    setTest({ producto: updatedProductos });
  };

  const handleSumCantidad = (producto) => {
    const updatedProductos = test.producto.map((prod) => {
      if (prod.nombre === producto.nombre_producto) {
        prod.sumCantidad();
      }
      return prod;
    });
    setTest({ producto: updatedProductos });
  };

  return (
    <div className="productsComp">
      <div className="title">
        <h1>Productos</h1>
      </div>
      <div className="elements">
        {products?.map((prods) => {
          const controls = (
            <div className="controls">
              <div className="panel">
                <button onClick={() => handleResCantidad(prods)}>-</button>
                <p>
                  {
                    test.producto.find(
                      (prod) => prod.nombre === prods.nombre_producto
                    )?.cantidad
                  }
                </p>
                <button onClick={() => handleSumCantidad(prods)}>+</button>
              </div>
              <div className="value">
                <p>
                  ${" "}
                  {test.producto
                    .find((prod) => prod.nombre === prods.nombre_producto)
                    ?.calcularPrecioTotal()}
                </p>
              </div>
            </div>
          );

          const noControls = (element) => {
            return (
              <div
                className="noControls"
                onClick={() => element.insertIntoDb()}
              >
                <button>+ Añadir al carrito</button>
              </div>
            );
          };

          const fDisplay = () => {
            const validate = test.producto.find(
              (prod) => prod.id === prods.id_metadata_producto
            );
            if (validate.cantidad === 0) {
              return noControls(validate);
            } else {
              return controls;
            }
          };

          return (
            <div className="card" key={prods.id_producto}>
              <div className="title">
                <div className="promt">
                  <p>{prods.nombre_producto}</p>
                </div>
                <div className="unit">
                  <div className="container">
                    <p>$ {prods.precio_producto} c/u</p>
                  </div>
                </div>
              </div>
              <div className="pImg">
                <img
                  src={"../../images/" + prods.image}
                  alt={prods.nombre_producto}
                />
              </div>
              {fDisplay()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Homecom = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [prodsPool, setProdsPool] = useState(null);
  const firstRender = useRef(true);
  const firstSet = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      getProducts();
      firstRender.current = false;
    } else {
      if (prodsPool !== null && firstSet.current===true) {
        setProduct(prodsPool[0]);
        if (product !== null) {
          firstSet.current=false;
          setisLoading(false);
        }
      }
    }
  }, [prodsPool, product]);

  const getProducts = async () => {
    const URI = "https://frutcola-backendpru.onrender.com/metadata";
    try {
      const response = await axios.get(URI);
      setProdsPool(response.data);
      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

  const changeProp = (element) => {
    setProduct(element);
  };
  if(isLoading){
    return <LoadingSpinner />;
  }

  return (
    <div className="homecontain">
      <Headercom product={product} />
      <Slider product={product} changeProp={changeProp} prodsPool={prodsPool}/>
      <Products prodsPool={prodsPool}/>
      <Footercom product={product} />
    </div>
  );
};
