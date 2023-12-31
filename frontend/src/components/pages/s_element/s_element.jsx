import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  sumItemFromCart,
  restItemFromCart,
  addToCart,
} from "../../../redux/cartSlice";
import LoadingSpinner from "../../common/loading/LoadingSpinner";
import { getProduct, formatPrice } from "../../../utils/helpers";
import Cookie from "js-cookie";
import { updateProductFromCart } from "../../../services/cart";
import "./s_element.css";

export const Element = ({ elements, father }) => {
  const [activeElement, setActiveElement] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (activeElement === undefined || activeElement === null) {
      setActiveElement(father);
      setActiveObject(null);
    } else {
      if (
        getProduct(cart.cart, activeElement.id_subMetadata_producto) ===
          undefined &&
        activeElement !== father
      ) {
        let newObject = {
          ...activeElement,
          id_producto: activeElement.id_subMetadata_producto,
          cantidad_producto: 0,
        };
        dispatch(addToCart(newObject));
        setActiveObject(
          getProduct(cart.cart, activeElement.id_subMetadata_producto)
        );
      } else {
        setActiveObject(
          getProduct(cart.cart, activeElement.id_subMetadata_producto)
        );
      }
    }
  }, [activeElement, activeObject, cart]);

  const sumCantidad = async () => {
    dispatch(sumItemFromCart(activeObject));
    if (Cookie.get("token")) {
      const res = await updateProductFromCart(
        Cookie.get("token"),
        user.id,
        activeObject.id_producto,
        (activeObject.cantidad_producto + 1)
        );
        if (res.status === 200) {
          console.log("Elemento actualizado");
        }
      }
  };

  const subsCantidad = async () => {
    dispatch(restItemFromCart(activeObject));
    if (Cookie.get("token")) {
      const res = await updateProductFromCart(
        Cookie.get("token"),
        user.id,
        activeObject.id_producto,
        (activeObject.cantidad_producto -1)
        );
        if (res.status === 200) {
          console.log("Elemento actualizado");
        }
      }
  };

  const controls = (
    <div className="controls">
      <div className="panel">
        <button onClick={() => subsCantidad()}>
          -
        </button>
        <p>{activeObject?.cantidad_producto}</p>
        <button onClick={() => sumCantidad()}>
          +
        </button>
      </div>
      <div className="value">
        <p>
          Subtotal:{" "}
          <p>
            ${" "}
            {formatPrice(
              activeObject?.cantidad_producto * activeObject?.precio_producto
            )}
          </p>
        </p>
        <button onClick={() => navigate("/carrito")}>Ir al carrito</button>
      </div>
    </div>
  );

  const noControls = () => {
    return (
      <div className="noControls">
        <button onClick={() => dispatch(sumItemFromCart(activeObject))}>
          + Añadir al carrito
        </button>
      </div>
    );
  };
  const pricing = () => {
    return <h4>$ {formatPrice(activeObject?.precio_producto)}</h4>;
  };

  const fDisplay = () => {
    if (activeObject?.cantidad_producto === 0) {
      return noControls();
    } else if (activeObject === null || activeObject === undefined) {
      return;
    } else {
      return controls;
    }
  };

  const pDisplay = () => {
    if (activeObject === null || activeObject === undefined) {
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
              <source
                srcSet={`../../images/${
                  activeElement?.image.split(".")[0]
                }.avif`}
                type="image/avif"
              />
              <source
                srcSet={`../../images/${
                  activeElement?.image.split(".")[0]
                }.webp`}
                type="image/webp"
              />
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

export const Selement = ({ product }) => {
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

  return <Element elements={elements} father={product} />;
};
