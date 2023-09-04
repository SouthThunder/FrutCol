import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./slider.css";
import "./products.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import { Producto } from "./cartSlice";
import {fresa} from './sliderProds'
import LoadingSpinner from "../loading/LoadingSpinner";


export const Slider = ({ product, changeProp }) => {

  const firstRender = useRef(true);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [primaryColor, setPrimaryColor] = useState();
  const [currentImageback, setCurrentImageback] = useState();
  const [currentWord, setCurrentWord] = useState();
  const [currentPrice, setCurrentprice] = useState();

  const [prodsPool, setProdsPool] = useState(null);



  const getProducts = async () => {
    const URI = "https://frutcola-backendpru.onrender.com/metadata";
    try {
      const response = await axios.get(URI);
      setProdsPool(response.data);
    } catch (error) {
      console.error(error);
    }
  };

    const changestyle = (
    color,
    maincolor,
    imageIndex,
    imagebackIndex,
    word,
    precio
  ) => {
    setBackgroundColor(color);
    setPrimaryColor(maincolor);
    setCurrentImage(imageIndex);
    setCurrentImageback(imagebackIndex);
    setCurrentWord(word);
    setCurrentprice(precio);
  };
  const updateProp = (element) => {
    changeProp(element);
  };



  useEffect(() => {
    if(firstRender.current){
      firstRender.current= false;
      getProducts()
    }else{
      if(prodsPool!==null){
        changestyle(
          prodsPool[0].comp_color,
          prodsPool[0].main_color,
          `../../images/${prodsPool[0].image}`,
          `../../images/${prodsPool[0].stain_image}`,
          prodsPool[0].nombre_producto,
          prodsPool[0].precio_producto
        );
      } 
    }
  }, [prodsPool]);

  const incrementArray = (step) => {
    const newIndex = (activeProductIndex + step + prodsPool.length) % prodsPool.length;
    setActiveProductIndex(newIndex);
    const nextProduct = prodsPool[newIndex];
    changestyle(
      nextProduct.comp_color,
      nextProduct.main_color,
      `../../images/${nextProduct.image}`,
      `../../images/${nextProduct.stain_image}`,
      nextProduct.nombre_producto,
      nextProduct.precio_producto
    );
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
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Products = (props) => {
  const URI = "https://frutcola-backendpru.onrender.com/metadata";
  const [products, setProducts] = useState([]);
  const [promt, setPromt] = useState([]);
  const [test, setTest] = useState({
    producto: [],
  });

  useEffect(() => {
    checkPromt();
    getProducts();
  }, [test.producto]);

  const checkPromt = () => {
    if (props.promt === undefined || props.promt === null) {
      setPromt("Productos");
    } else {
      setPromt(props.promt);
    }
  };

  const getProducts = async () => {
    const id_carrito= jwt_decode(localStorage.getItem('token'))
    const idk= `https://frutcola-backendpru.onrender.com/carrito/${id_carrito.id_usuario}`
    try {
      const res = await axios.get(URI);
      const res2 = await axios.get(idk)
      setProducts(res.data);
      setTest({
        producto: res.data.map(
          (prod) =>{
            const it= res2.data.find((lproduc)=> lproduc.id_producto === prod.id_metadata_producto)
            if(it===undefined){
              return new Producto(prod.id_metadata_producto, prod.nombre_producto, prod.precio_producto, 0)
            }else{
              return new Producto(it.id_producto, prod.nombre_producto, prod.precio_producto, it.cantidad_producto)
            }
            
          } 
        ),
      });
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const handleResCantidad = (element) => {
    const updatedProductos = test.producto.map((prod) => {
      if (prod.nombre === element.nombre_producto) {
        if(prod.cantidad===1){
          prod.delProd();
        }else{
          prod.resCantidad();
        }
      }
      return prod;
    });
    setTest({producto: updatedProductos})
}

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
        <h1>{promt}</h1>
      </div>
      <div className="elements">
        {products?.map((prods) => {

          const controls= (
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
          )

          const noControls= (element) =>{
            return(
              <div className="noControls" onClick={() => element.insertIntoDb()}>
              <button>
                + Añadir al carrito
              </button>
            </div>
            )
          }

          const fDisplay = () =>{
            const validate = test.producto.find((prod) => prod.id === prods.id_metadata_producto)
            if(validate.cantidad === 0){
              return noControls(validate)
            }else{
              return controls
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
          )
        } )}
      </div>
    </div>
  );
};

export const Homecom = () => {
  const [product, setProduct] = useState();
  const [isLoading, setisLoading] = useState(true);
  const changeProp = (element) => {
    setProduct(element);
  };

  useEffect(() =>{
     getProducts()
  }, [])

  const getProducts = async() =>{
    const URI= 'https://frutcola-backendpru.onrender.com/metadata';
    try {
      const response = await axios.get(URI);

      setProduct(response.data[0])
      setisLoading(false)
      //console.log(product)
    } catch (error) {
      console.error(error)
    }    
  }

  if(isLoading){
    return <LoadingSpinner />;
  }

  return (
    <div className="homecontain">
      <Headercom prod={product} />
      <Slider prod={product} changeProp={changeProp} />
      <Products />
      <Footercom prod={product} />
    </div>
  );
};
