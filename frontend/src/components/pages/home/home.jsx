import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { Stain } from "../../common/stain/stain";
import "./slider.css";
import "./products.css";

export const Slider = ({ product, changeProp, prodsPool }) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [primaryColor, setPrimaryColor] = useState([]);
  const [currentWord, setCurrentWord] = useState([]);
  const [sliderProds, setSliderProds] = useState([]);
  const firstLoad = useRef(false);

  const changestyle = (element) => {
    setBackgroundColor(element.comp_color);
    setPrimaryColor(element.main_color);
    setCurrentImage(`${product.image}`);
    setCurrentWord(element.nombre_producto);
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
    prodsPool.map((prod) => {
      return auxProdsPull.push(prod);
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
          <h1 id="desktop">{currentWord}</h1>
          <h1 className="responsiveText">Pulpa de fruta 100% natural</h1>
          <h3 className="responsiveText">Sin aditivos ni conservantes</h3>
        </div>
        <div className="n2">{/* <h1>$ {currentPrice}</h1> */}</div>
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
        <Stain color={product.font_color} />
        <picture>
  {typeof currentImage === 'string' && (
    <>
      <source
        srcSet={
          "../../images/" +
          currentImage.split(".")[0] +
          ".avif"
        }
        type="image/avif"
      />
      <source
        srcSet={
          "../../images/" +
          currentImage.split(".")[0] +
          ".webp"
        }
        type="image/webp"
      />
    </>
  )}
  <img
    src={"../../images/" + currentImage}
    alt={currentWord}
  />
</picture>
      </div>

      <div className="third">
        <div className="n1">
          <h1>¡Apasionante y Natural!</h1>
          <h2 id="desktop">Pulpa de fruta 100% natural</h2>
          <h3 id="desktop">Sin aditivos ni conservantes</h3>
          <h2 className="responsiveText">{currentWord}</h2>
          <h3 className="responsiveText">¡Apasionante y natural!</h3>
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
                    <picture>
                      <source
                        srcSet={
                          "../../images/" +
                          element.image.split(".")[0] +
                          ".avif"
                        }
                        type="image/avif"
                      />
                      <source
                        srcSet={
                          "../../images/" +
                          element.image.split(".")[0] +
                          ".webp"
                        }
                        type="image/webp"
                      />
                      <img
                        src={"../../images/" + element.image}
                        alt={element.nombre_producto}
                      />
                    </picture>
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

export const ProdsComp = ({ product, changeProp }) => {
  const element = product;
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const navBtn = () => {
    return (
      <div className="noControls">
        <button
          onClick={() => {
            changeProp(element);
            navigate(`/${element.id_metadata_producto}`);
          }}
        >
          Ver opciones
        </button>
      </div>
    );
  };

  return (
    <div className="card" key={element.id_metadata_producto}>
      <div className="title">
        <div className="promt">
          <p>{element.nombre_producto}</p>
        </div>
      </div>
      <div className="pImg">
        <picture>
          <source
            srcSet={"../../images/" + element.image.split(".")[0] + ".avif"}
            type="image/avif"
          />
          <source
            srcSet={"../../images/" + element.image.split(".")[0] + ".webp"}
            type="image/webp"
          />
          <img
            src={"../../images/" + element.image}
            alt={element.nombre_producto}
          />
        </picture>
      </div>
      {navBtn()}
    </div>
  );
};

export const Products = ({ prodsPool, user, changeProp }) => {
  useEffect(() => {}, []);

  return (
    <div className="productsComp" id="products">
      <div className="title">
        <h1>Productos</h1>
      </div>
      <div className="elements">
        {prodsPool?.map((prods) => {
          return (
            <ProdsComp
              key={prods.id_producto}
              product={prods}
              loged={user}
              changeProp={changeProp}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Homecom = ({ product, changeProp, prodsPool, user }) => {
  return (
    <div className="homecontain">
      <Slider product={product} changeProp={changeProp} prodsPool={prodsPool} />
      <Products prodsPool={prodsPool} user={user} changeProp={changeProp} />
      <div className="whatsapp-container">
        <Link to="https://wa.me/573174358995" target="_blank">
          <IoLogoWhatsapp />
        </Link>
      </div>
    </div>
  );
};
