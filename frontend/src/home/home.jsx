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

export const Slider = ({prod, changeProp}) => {
  const array= [fresa,mora,mango,Guanabana,maracuya];

  console.log(prod)
  const [backgroundColor, setBackgroundColor] = useState(prod.compColor);
  const [currentImage, setCurrentImage] = useState(prod.image);
  const[primaryColor,setPrimaryColor]=useState(prod.mainColor)
  const [currentImageback, setCurrentImageback] = useState(prod.stainImage);
  const [currentWord, setCurrentWord] = useState(prod.name);
  const [currentPrice, setCurrentprice] = useState(prod.precio);
  

  
 
  
  
  const changestyle = (color,maincolor,imageIndex,imagebackIndex,word,precio) =>{
    setBackgroundColor(color);
    setPrimaryColor(maincolor);
    setCurrentImage(imageIndex);
    setCurrentImageback(imagebackIndex);
    setCurrentWord(word);
    setCurrentprice(precio);
  };
  const updateProp= (element) =>{
    changeProp(element);
  }

  return (
    <div className="slider" style={{ backgroundColor , transition: 'all 1s var(--btn-cubic-bezier)'}}>
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
          <button  onMouseEnter={(e) => (e.target.style.backgroundColor = primaryColor)}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFF" )} >+ Añadir al carrito</button>
        </div>
        <div className="n4">
          <p>01</p>
          <span style={{color: primaryColor}}></span>
          <p>05</p>
        </div>
      </div>

      <div className="second">
        <img src={currentImageback} alt="" />
        <img src={currentImage } alt="" />
      </div>
      

      <div className="third">
        <div className="n1">
          <h1>Apasionante y Natural</h1>
          <h3>
            Pulpa de fruta 100% <div className="test">natural</div>
          </h3>
        </div>
        <div className="n2">
          <button style={{color: primaryColor , transition: 'all 1s var(--btn-cubic-bezier)'}}>&#60;</button>
          <button style={{ backgroundColor: primaryColor , transition: 'all 1s var(--btn-cubic-bezier)'}}>&#62;</button>
        </div>
        <div className="n3">
        <div className="products__preview">

        {array.map((element) => (
              <button key={element.id} className="fruit" onClick={() =>{ 
                changestyle(element.compColor, element.mainColor,element.image,element.stainImage, element.name,element.precio)
                updateProp(element)
                }} >
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
  const [product, setProduct] = useState(fresa);
  const changeProp= (element) =>{
    setProduct(element);
  }

  return (
    <div className="homecontain">
      <Headercom prod={product}/>
      <Slider prod={product} changeProp={changeProp}/>
      <Products />
      <Footercom prod={product}/>
    </div>
  );
};


