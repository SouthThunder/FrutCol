import React, { useEffect, useRef, useState } from "react";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import LoadingSpinner from "../loading/LoadingSpinner";
import axios from "axios";
import "./s_element.css";
import { useParams } from "react-router-dom";

export const Element = ({ elements, father }) => {
  const [activeElement, setActiveElement] = useState([]);

  useEffect(() => {
    if (activeElement?.length === 0) {
      setActiveElement(father);
    }
  }, [activeElement]);

  return (
    <div className="elementComp">
      <div className="container">
        <div className="title">
          <h1>{father.nombre_producto}</h1>
        </div>
        <div className="product">
          <div className="imageHolder">
            <img
              src={`../../images/${activeElement?.image}`}
              alt={activeElement?.nombre_producto}
            />
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
                  setActiveElement(elements[e.target.value])
                }}
                id=""
              >
                <option value="">Elija una opcion</option>
                {elements.map((op, index) => {
                  return (
                    <option
                      value={index}
                      key={op.id_subMetadata_producto}
                    >
                      {op.nombre_producto}
                    </option>
                  );
                })}
              </select>
              <p>{activeElement?.descripcion_producto}</p>
              <div className="panel">
                {/* <button onClick={() => handleResCantidad()}>-</button>
                <p>{prods.cantidad}</p>
                <button onClick={() => handleSumCantidad()}>+</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Selement = ({ product }) => {
  const [elements, setElements] = useState(null);
  const [father, setFather] = useState(null);
  const [loader, setLoader] = useState(true);
  const firstLoad = useRef(true);
  const { id } = useParams();

  useEffect(() => {
    if (firstLoad.current) {
      Promise.all([getElements(), getFather()])
        .then(([data1, data2]) => {
          setElements(data1);
          setFather(data2);
        })
        .catch((error) => {
          console.error(error);
        });
      firstLoad.current = false;
    } else {
      if (elements !== null) {
        setLoader(false);
      }
    }
  }, [elements]);

  const getElements = async () => {
    try {
      const URI = `http://localhost:8000/smetadata/${id}`;
      const res = await axios.get(URI);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getFather = async () => {
    try {
      const URI = `http://localhost:8000/metadata/${id}`;
      const res = await axios.get(URI);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  if (loader) {
    return <LoadingSpinner />;
  }

  return (
    <div className="selement">
      <Headercom product={product} />
      <Element elements={elements} father={father} />
      <Footercom product={product} />
    </div>
  );
};
