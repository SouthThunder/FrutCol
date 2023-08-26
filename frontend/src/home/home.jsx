import React, { useState, useEffect } from "react";
import axios from "axios";
import "./slider.css";
import "./products.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import { Producto } from "./cartSlice";
import { fresa } from "./sliderProds";
import { mora } from "./sliderProds";
import { mango } from "./sliderProds";
import { Guanabana } from "./sliderProds";
import { maracuya } from "./sliderProds";

export const Slider = () => {
  const array= [];

  const colorOptions=['#f8ccd4','#e1dbed','green','yellow','purple']
  const Maincolors=['#FF355E','#781fbb','green','yellow','purple']
  const images=['../../images/fresa.jpg','../../images/mora.jpg','../../images/mango.jpg','../../images/guanabana.jpg','../../images/maracuya.jpg']
  const imagesback=['../../images/stain fresa.png','../../images/stain mora.png','../../images/mango.jpg','../../images/guanabana.jpg','../../images/maracuya.jpg']
  const words = ['Fresa', 'Mora', 'Mango', 'Guanabana','Maracuya'];
  const [backgroundColor, setBackgroundColor] = useState(colorOptions[0]);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const[primaryColor,setPrimaryColor]=useState(Maincolors[0])
  const [currentImageback, setCurrentImageback] = useState(imagesback[0]);
  const [currentWord, setCurrentWord] = useState(words[0]);
  useEffect(()=>{

  },[])

  const initArray= () =>{
    array.push(fresa);
    array.push(mora);
    array.push(mango);
    array.push(Guanabana);
    array.push(maracuya);
  }
  useEffect(() => {
    initArray(); // Llama a initArray durante la inicialización del componente
  }, []);
  
  
  const changestyle = (color,maincolor,imageIndex,imagebackIndex,word) =>{
    setBackgroundColor(color);
    setPrimaryColor(maincolor);
    setCurrentImage(imageIndex);
    setCurrentImageback(imagebackIndex);
    setCurrentWord(word);
  };
  console.log(array);

  return (
    <div className="slider" style={{ backgroundColor }}>
      <div className="first">
        <div className="n1">
          <h1>
            Pulpa de <br /> {currentWord}
          </h1>
        </div>
        <div className="n2">
          <h1>$ 9.000 c/u</h1>
        </div>
        <div className="n3">
          <button>+ Añadir al carrito</button>
        </div>
        <div className="n4">
          <p>01</p>
          <span></span>
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
          <button>&#60;</button>
          <button style={{ backgroundColor: primaryColor }}>&#62;</button>
        </div>
        <div className="n3">
        <div className="products__preview">

        {array.map((element) => (
              <button key={element.id} className="fruit" onClick={() => changestyle(element.compColor, element.maincolor,element.image,element.stainImage, element.name)} >
                <div className="fruit__container">
                  <img src={element.image} alt="" />
                </div>
              </button>
            ))}
        
        </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const URI = "https://frutcola-backendpru.onrender.com/productos";
  const [products, setProducts] = useState([]);
  const [test, setTest] = useState({
    producto: []
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get(URI);
      setProducts(res.data);
      setTest({ producto: res.data.map(prod => new Producto(prod.nombre_producto, prod.precio_producto, 0)) });
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const handleResCantidad = (producto) => {
    const updatedProductos = test.producto.map(prod => {
      if (prod.nombre === producto.nombre_producto) {
        prod.resCantidad();
      }
      return prod;
    });
    setTest({ producto: updatedProductos });
  };

  const handleSumCantidad = (producto) => {
    const updatedProductos = test.producto.map(prod => {
      if (prod.nombre === producto.nombre_producto) {
        prod.sumCantidad();
      }
      return prod;
    });
    setTest({ producto: updatedProductos });
  };

  return (
    <div className="products">
      <div className="title">
        <h1>Productos</h1>
      </div>
      <div className="elements">
        {products.map((prods) => (
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
              <img src={"../../images/" + prods.img_producto} alt={prods.nombre_producto} />
            </div>
            <div className="controls">
              <div className="panel">
                <button onClick={() => handleResCantidad(prods)}>-</button>
                <p>{test.producto.find(prod => prod.nombre === prods.nombre_producto)?.cantidad}</p>
                <button onClick={() => handleSumCantidad(prods)}>+</button>
              </div>
              <div className="value">
                <p>$ {test.producto.find(prod => prod.nombre ===prods.nombre_producto)?.calcularPrecioTotal()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Homecom = () => {
  return (
    <div className="homecontain">
      <Headercom />
      <Slider />
      <Products />
      <Footercom />
    </div>
  );
};


