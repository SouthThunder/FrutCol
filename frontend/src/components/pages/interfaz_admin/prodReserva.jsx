import { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import { deliverOrder } from "../../../services/reserva.js";
import { getReceiptById } from "../../../services/receipt.js";
import { getResourceById } from "../../../services/reserProd.js";
import LoadingSpinner from "../../common/loading/LoadingSpinner.jsx";

export const ProductosReserva = (prop) => {
    const [products, setProducts] = useState(null);
    const [receiptData, setReceiptData] = useState(null);
    const [loading, setLoading] = useState(true);
    const firstRender = useRef(true);
    const metadata = prop.prodsPool;
  
    useEffect(() => {
      if (firstRender.current) {
        Promise.all([getProducts(), getReceiptData()]);
        firstRender.current = false;
      } else {
        if (products !== null && receiptData !== null) {
          setLoading(false);
        } else {
          setLoading(true);
        }
      }
    }, [products, receiptData]);
  
    const getProducts = async () => {
      try {
        const res = await getResourceById(
          prop.reservation.num_orden,
          Cookie.get("token")
        );
        if (res.status === 200) {
          setProducts(res.data);
        } else {
          alert("No se pudo obtener la información de los productos");
        }
      } catch (error) {
        console.error("ERROR: " + error);
      }
    };
  
    const getReceiptData = async () => {
      try {
        const res = await getReceiptById(
          prop.reservation.num_orden,
          Cookie.get("token")
        );
        if (res.status === 200) {
          setReceiptData(res.data);
        } else {
          alert("No se pudo obtener la información de la factura");
        }
      } catch (error) {
        console.error("ERROR: " + error);
      }
    };
  
    const handleEntregarOrden = async () => {
      try {
        const res = await deliverOrder(
          Cookie.get("token"),
          prop.reservation.num_orden,
          prop.reservation.id_reserva,
          prop.reservation.num_productos_reserva,
          prop.reservation.valor_reserva,
          prop.reservation.fecha_reserva
        );
        if (res.status === 200) {
          window.location.reload(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const checkNotProcessed = () => {
      if (!prop.reservation.estado_reserva) {
        return (
          <div className="control">
            <button onClick={() => handleEntregarOrden()}>Entregar orden</button>
          </div>
        );
      } else {
        return;
      }
    };
  
    if (loading) {
      return <LoadingSpinner />;
    }
  
    return (
      <div className="reserva">
        <h2>Número de orden: {prop.reservation.num_orden}</h2>
        <div className="resuser">
          <h3>Datos de facturación</h3>
          <div className="grid">
            <div className="r1">
              <div className="c1">
                <p>
                  <strong>Cédula:</strong> {receiptData.iden_facturacion}
                </p>
              </div>
              <div className="c2">
                <p>
                  <strong>Correo:</strong> {receiptData.correo_facturacion}
                </p>
              </div>
              <div className="c3">
                <p>
                  <strong>Dirección:</strong> {receiptData.direccion_facturacion}
                </p>
              </div>
            </div>
            <div className="r2">
              <div className="c1">
                <p>
                  <strong>Nombre:</strong> {receiptData.nombre_facturacion}
                </p>
              </div>
              <div className="c2">
                <p>
                  <strong>Telefono:</strong> {receiptData.telefono_facturacion}
                </p>
              </div>
              <div className="c3">
                <p>
                  <strong>Ciudad:</strong> {receiptData.ciudad_facturacion}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="resprod">
          <h3>Productos</h3>
          <div className="elements">
            <div className="labels">
              <div className="lItem">
                <p>Producto</p>
              </div>
              <div className="lItem">
                <p>Cantidad</p>
              </div>
              <div className="lItem">
                <p>Valor</p>
              </div>
            </div>
            {products?.map((products) => {
              let matchingProduct = null;
              metadata.map((prod) => {
                return prod.SubMetadata_productos.map((sub) => {
                  if (sub.id_subMetadata_producto === products.id_producto) {
                    matchingProduct = sub;
                  }
                });
              });
              return (
                <div className="product" key={products.id_producto}>
                  <div className="pImg">
                    <div className="title">
                      <h3>{matchingProduct.nombre_producto}</h3>
                    </div>
                    <picture>
                      <source
                        srcSet={
                          "../../images/" +
                          matchingProduct.image.split(".")[0] +
                          ".avif"
                        }
                        type="image/avif"
                      />
                      <source
                        srcSet={
                          "../../images/" +
                          matchingProduct.image.split(".")[0] +
                          ".webp"
                        }
                        type="image/webp"
                      />
                      <img
                        src={"../../images/" + matchingProduct.image}
                        alt={matchingProduct.nombre_producto}
                      />
                    </picture>
                  </div>
                  <div className="promt">
                    <p>Cantidad: {products.cantidad_producto}</p>
                  </div>
                  <div className="unit">
                    <p>$ {matchingProduct.precio_producto} c/u</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="separator"></div>
          <div className="total">
            <p>
              <strong>Total:</strong> {prop.reservation.valor_reserva}
            </p>
          </div>
        </div>
        {checkNotProcessed()}
      </div>
    );
  };
  