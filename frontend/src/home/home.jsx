import React, { useState, useEffect, useRef } from "react";
import "./slider.css";
import "./products.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import { Link, useNavigate } from "react-router-dom";
import { Selement } from "../s_element/s_element";

export const Slider = ({ product, changeProp, prodsPool }) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [primaryColor, setPrimaryColor] = useState([]);
  const [currentWord, setCurrentWord] = useState([]);
  const [currentPrice, setCurrentprice] = useState([]);
  const [currentWeight, setCurrentWeight] = useState([]);
  const [sliderProds, setSliderProds] = useState([]);
  const firstLoad = useRef(false);

  const changestyle = (element) => {
    setBackgroundColor(element.comp_color);
    setPrimaryColor(element.main_color);
    setCurrentImage(`../../images/${product.image}`);
    setCurrentWord(element.nombre_producto);
    setCurrentprice(element.precio_producto);
    setCurrentWeight(element.peso_producto);
  };
  const updateProp = (element) => {
    changeProp(element);
  };

  useEffect(() => {
    if (!firstLoad.current) {
      chkLength();
      firstLoad.current = true;
    }
    if (product !== null) {
      changestyle(product);
    }
  }, [product]);

  const chkLength = () => {
    const auxProdsPull = [];
    prodsPool
      .filter((prod) => prod.stock_producto > 0)
      .map((prod) => {
        auxProdsPull.push(prod);
      });

    if (auxProdsPull.length > 5) {
      const auxProds = [];
      for (let i = 0; i < 5; i++) {
        auxProds.push(auxProdsPull[i]);
      }
      setSliderProds(auxProds);
    } else {
      setSliderProds(auxProdsPull);
    }
  };

  const handleAddToCart = () => {
    // Realiza cualquier acción relacionada con agregar al carrito aquí

    // Obtén la referencia al elemento con el ancla '#products'
    const productsAnchor = document.querySelector("#products");

    if (productsAnchor) {
      // Usa scrollIntoView con el comportamiento de desplazamiento suave
      productsAnchor.scrollIntoView({ behavior: "smooth" });
    }
  };
  const incrementArray = (step) => {
    const newIndex =
      (activeProductIndex + step + sliderProds.length) % sliderProds.length;
    setActiveProductIndex(newIndex);
    const nextProduct = sliderProds[newIndex];
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
          <h1>{currentWord}</h1>
        </div>
        <div className="n2">
          <h1>{currentWeight} Gramos</h1>
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
          <p>0{activeProductIndex + 1}</p>
          <input
            type="range"
            min={0}
            max={100}
            step={100 / sliderProds.length}
            value={(activeProductIndex + 1) * (100 / sliderProds.length)}
            disabled
            style={{
              backgroundImage: `linear-gradient(${primaryColor}, ${primaryColor})`,
              backgroundSize: `${
                (activeProductIndex + 1) * (100 / sliderProds.length)
              }% 100%`,
              transition: "all 1s var(--btn-cubic-bezier)",
            }}
          ></input>
          <p>0{sliderProds.length}</p>
        </div>
      </div>

      <div className="second">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0,0,512,512"
          preserveAspectRatio="xMidYMid meet"
          xlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path
              fill={product.font_color}
              d="M 179.5,47.5 C 200.856,47.6743 213.689,58.3409 218,79.5C 219.608,89.3051 218.274,98.6385 214,107.5C 198.93,122.414 184.263,121.748 170,105.5C 160.457,92.3314 158.124,77.9981 163,62.5C 166.19,54.8428 171.69,49.8428 179.5,47.5 Z"
            />
          </g>
          <g>
            <path
              fill={product.font_color}
              d="M 66.5,54.5 C 91.1042,53.7273 108.271,64.7273 118,87.5C 125.039,103.97 123.706,119.637 114,134.5C 100.758,145.207 86.5914,146.374 71.5,138C 49.2713,122.372 40.7713,101.206 46,74.5C 49.4444,64.2207 56.2777,57.554 66.5,54.5 Z"
            />
          </g>
          <g>
            <path
              fill={product.font_color}
              d="M 372.5,84.5 C 395.483,86.417 404.316,98.7503 399,121.5C 392.814,138.851 380.648,149.184 362.5,152.5C 346.712,151.044 338.378,142.378 337.5,126.5C 339.813,104.534 351.479,90.5343 372.5,84.5 Z"
            />
          </g>
          <g>
            <path
              fill={product.font_color}
              d="M 265.5,92.5 C 280.381,91.1813 294.048,94.6813 306.5,103C 314.691,109.237 317.524,117.404 315,127.5C 311.547,136.406 307.547,145.073 303,153.5C 301.561,158.762 301.228,164.096 302,169.5C 303.945,170.863 306.112,171.697 308.5,172C 320.901,172.81 333.234,174.143 345.5,176C 364.1,184.049 371.6,198.216 368,218.5C 363.4,228.692 357.067,237.692 349,245.5C 344.872,251.422 341.539,257.756 339,264.5C 338.185,281.385 344.018,295.551 356.5,307C 366.222,312.723 374.722,319.889 382,328.5C 389.724,345.661 385.558,359.161 369.5,369C 349.826,379.334 329.826,380.001 309.5,371C 298.491,364.497 287.824,357.497 277.5,350C 269.222,344.683 260.222,342.016 250.5,342C 243.532,343.569 237.699,347.069 233,352.5C 225.667,363.167 218.333,373.833 211,384.5C 190.891,402.936 168.058,407.103 142.5,397C 122.96,387.111 111.46,371.277 108,349.5C 106.231,335.702 107.897,322.369 113,309.5C 116.414,303.003 120.081,296.67 124,290.5C 126.796,284.384 125.63,279.218 120.5,275C 109.167,268.667 97.8333,262.333 86.5,256C 76.2583,250.682 69.4249,242.515 66,231.5C 63.0014,216.66 68.5014,206.493 82.5,201C 94.9781,198.033 106.645,200.033 117.5,207C 128.388,215.551 140.054,222.884 152.5,229C 161.123,232.413 169.456,231.746 177.5,227C 182.291,223.258 184.124,218.424 183,212.5C 179.376,204.277 174.042,197.277 167,191.5C 157.976,176.441 160.142,163.274 173.5,152C 176.6,150.245 179.933,149.411 183.5,149.5C 196.39,152.638 209.39,155.305 222.5,157.5C 228.373,157.987 232.54,155.654 235,150.5C 234.808,135.298 238.142,120.965 245,107.5C 250.336,100.313 257.17,95.3133 265.5,92.5 Z"
            />
          </g>
          <g>
            <path
              fill={product.font_color}
              d="M 432.5,217.5 C 444.559,216.129 454.726,219.796 463,228.5C 469.724,242.132 467.557,254.299 456.5,265C 440.193,278.196 422.86,279.863 404.5,270C 394.805,259.241 393.971,247.741 402,235.5C 409.881,225.481 420.048,219.481 432.5,217.5 Z"
            />
          </g>
          <g>
            <path
              fill={product.font_color}
              d="M 388.5,381.5 C 410.617,379.306 426.784,387.972 437,407.5C 441.729,428.689 433.229,440.355 411.5,442.5C 393.536,440.946 380.369,432.279 372,416.5C 366.327,399.287 371.827,387.621 388.5,381.5 Z"
            />
          </g>
          <g>
            <path
              fill={product.font_color}
              d="M 250.5,404.5 C 263.163,403.106 273.663,407.106 282,416.5C 288.312,432.901 284.145,446.067 269.5,456C 255.311,464.697 240.645,465.697 225.5,459C 216.178,452.037 213.012,442.87 216,431.5C 220.474,420.359 228.308,412.526 239.5,408C 243.254,406.691 246.921,405.525 250.5,404.5 Z"
            />
          </g>
        </svg>
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
            {sliderProds.map((element) => {
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

export const ProdsComp = ({
  product,
  loged,
  reloader,
}) => {
  const element = product;
  const navigate = useNavigate();

  useEffect(() => {}, [reloader]);

  const navBtn = () => {
    return (
      <div className="noControls">
        {loged ? (
          <button
            onClick={() => navigate(`/${element.id}`)}
          >
            Ver opciones
          </button>
        ) : (
          <button onClick={() => navigate("/ingreso")}>
            Ver opciones
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="card" key={element.id_producto}>
      <div className="title">
        <div className="promt">
          <p>{element.nombre}</p>
        </div>
      </div>
      <div className="pImg">
        <img src={"../../images/" + element.image} alt={element.nombre} />
      </div>
      {navBtn()}
    </div>
  );
};

export const Products = ({ lProductos, user, headers, updateLProducts }) => {
  useEffect(() => {}, []);

  return (
    <div className="productsComp" id="products">
      <div className="title">
        <h1>Productos</h1>
      </div>
      <div className="elements">
        {lProductos?.map((prods) => {
          return (
            <ProdsComp
              product={prods}
              headers={headers}
              loged={user}
              updateLProducts={updateLProducts}
              key={prods.id_producto}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Homecom = ({
  product,
  changeProp,
  prodsPool,
  lProductos,
  user,
  headers,
  updateLProducts,
}) => {
  return (
    <div className="homecontain">
      <Headercom product={product} />
      <Slider product={product} changeProp={changeProp} prodsPool={prodsPool} />
      <Products
        lProductos={lProductos}
        user={user}
        headers={headers}
        updateLProducts={updateLProducts}
      />
      <div className="whatsapp-container">
        <Link 
          to="https://wa.me/573174358995"
          target="_blank"
        >
          <img src="../../images/wpp_logo.png" alt="WhatsApp Logo" />
        </Link>
      </div>
      <Footercom product={product} />
    </div>
  );
};
