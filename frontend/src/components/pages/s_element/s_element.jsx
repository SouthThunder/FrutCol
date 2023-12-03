import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../common/loading/LoadingSpinner";
import "./s_element.css";
import { useNavigate } from "react-router-dom";

export const Element = ({ elements, father, lProductos, updateLProducts }) => {
  const [activeElement, setActiveElement] = useState(null);
  const [isFather, setIsFather] = useState(true);
  const [test, setTest] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeElement === undefined || activeElement === null) {
      setActiveElement(father);
      setActiveObject(null);
    } else {
      getObject(activeElement.id_subMetadata_producto);
    }
  }, [activeElement, isFather, activeObject]);

  const headers = {
    Authorization: `${localStorage.getItem("token")}`, // Agrega "Bearer" antes del token si es necesario
  };

  const getObject = (id) => {
    return lProductos.map((obj) => {
      obj.map((sub) => {
        if (sub.id === id) {
          setActiveObject(sub);
        }
      });
    });
  };

  const handleResCantidad = () => {
    if (activeObject.cantidad === 1) {
      activeObject.delProd(headers);
      updateLProducts(activeObject);
      setTest(!test);
    } else {
      activeObject.resCantidad(headers);
      updateLProducts(activeObject);
      setTest(!test);
    }
  };

  const handleSumCantidad = () => {
    activeObject.sumCantidad(headers);
    updateLProducts(activeObject);
    setTest(!test);
  };

  const formatPrice = (price) => {
    return price?.toLocaleString("en-US");
  };

  const controls = (
    <div className="controls">
      <div className="panel">
        <button onClick={() => handleResCantidad()}>-</button>
        <p>{activeObject?.cantidad}</p>
        <button onClick={() => handleSumCantidad()}>+</button>
      </div>
      <div className="value">
        <p>
          Subtotal: <p>$ {formatPrice(activeObject?.calcularPrecioTotal())}</p>
        </p>
        <button onClick={() => navigate("/carrito")}>Ir al carrito</button>
      </div>
    </div>
  );

  const noControls = () => {
    return (
      <div className="noControls">
        <button
          onClick={() => {
            if (activeObject.exists) {
              activeObject.sumCantidad(headers);
              console.log("enter exists");
              updateLProducts(activeObject);
            } else {
              activeObject.insertIntoDb(headers);
              console.log("enter not exists");
              updateLProducts(activeObject);
            }
            setTest(!test);
          }}
        >
          + Añadir al carrito
        </button>
      </div>
    );
  };
  const pricing = () => {
    return <h4>$ {formatPrice(activeObject?.precio)}</h4>;
  };

  const fDisplay = () => {
    if (activeObject?.cantidad === 0) {
      return noControls();
    } else if (activeObject === null) {
      return;
    } else {
      return controls;
    }
  };

  const pDisplay = () => {
    if (activeObject === null) {
      return;
    } else {
      return pricing();
    }
  };

  return (
    <div className="elementComp">
      <div className="container">
        <div className="title">
          <h1>{father.nombre_producto}</h1>
        </div>
        <div className="product">
          <div className="imageHolder">
          <picture>
            <source srcSet={`../../images/${activeElement?.image.split('.')[0]}.avif`} type="image/avif"/>
            <source srcSet={`../../images/${activeElement?.image.split('.')[0]}.webp`} type="image/webp"/>
            <img
              src={`../../images/${activeElement?.image}`}
              alt={activeElement?.nombre_producto}
            />
          </picture>
          </div>
          <div className="info">
            <div className="promt">
              <h2>{activeElement?.nombre_producto}</h2>
            </div>
            <div className="presentaciones">
              <h4>Seleccione una presentacion</h4>
              <select
                name="estado"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setActiveElement(father);
                    setActiveObject(null);
                  } else {
                    setIsFather(false);
                    setActiveElement(elements[e.target.value]);
                  }
                }}
              >
                <option value="">Elija una opcion</option>
                {elements.map((op, index) => {
                  return (
                    <option value={index} key={op.id_subMetadata_producto}>
                      {op.nombre_producto}
                    </option>
                  );
                })}
              </select>
              <p>{activeElement?.descripcion_producto}</p>
              {pDisplay()}
              {fDisplay()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Selement = ({ product, lProductos, updateLProducts }) => {
  const [elements, setElements] = useState(null);
  const [loader, setLoader] = useState(true);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      getElements();
      firstLoad.current = false;
    } else {
      if (elements !== null) {
        setLoader(false);
      }
    }
  }, [elements]);

  const getElements = () => {
    setElements(() => {
      return product.SubMetadata_productos.map((sub) => {
        return sub;
      });
    });
  };

  if (loader) {
    return <LoadingSpinner />;
  }

  return (
    <div className="selement">
      <Element
        elements={elements}
        father={product}
        lProductos={lProductos}
        updateLProducts={updateLProducts}
      />
    </div>
  );
};
