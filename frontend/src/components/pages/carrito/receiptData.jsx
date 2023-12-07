import { useState } from "react";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { createOrder, createOrderForNullUser } from "../../../services/reserva";
import { getTotalItems, getTotalPrice } from "../../../utils/helpers";
import { clearCart } from "../../../redux/cartSlice"
import { updateProductFromCart } from "../../../services/cart";

export const ReceiptInfo = ({ openPopup, setOrderNumber }) => {
  const [deActive, setDeActive] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    correo: "",
    cedula: "",
    direccionEnvio: "",
  });
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    const newErrors = {};

    // Validar campos obligatorios
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = "Este campo es obligatorio";
      }
    }

    // Validar correo electrónico
    if (formData.correo && !validateEmail(formData.correo)) {
      newErrors.correo = "El correo electrónico no es válido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aquí puedes enviar los datos o realizar la acción de confirmación
      setDeActive(true);
      handlePurchase();
    }
  };

  const clearAPICart = () => {
      if(Cookie.get("token")){
        cart.cart.forEach(async (prod) => {
          await updateProductFromCart(
            Cookie.get("token"),
            user.id,
            prod.id_producto,
            0
          );
        });
      }
    dispatch(clearCart());
  }

  const handlePurchase = async () => {
    try {
      if (Cookie.get("token")) {
        const res = await createOrder(
          Cookie.get("token"),
          user.id,
          getTotalPrice(cart.cart),
          getTotalItems(cart.cart),
          new Date().toISOString().slice(0, 10),
          formData,
          cart.cart
        );
        if (res.status === 200) {
          setOrderNumber(res.data)
          toast.success("La compra ha sido creada");
          //eliminar productos del carrito
          clearAPICart();
          await new Promise((resolve) => setTimeout(resolve, 2500)); // Esperar 1 segundo
          openPopup();
        } else {
          toast.error("Error al crear la compra");
        }
      } else {
        const res = await createOrderForNullUser(
          getTotalPrice(cart.cart),
          getTotalItems(cart.cart),
          new Date().toISOString().slice(0, 10),
          formData,
          cart.cart
        );
        if (res.status === 200) {
          setOrderNumber(res.data)
          toast.success("La compra ha sido creada");
          //eliminar productos del carrito
          clearAPICart();
          await new Promise((resolve) => setTimeout(resolve, 2500)); // Esperar 1 segundo
          openPopup();
        } else {
          toast.error("Error al crear la compra");
        }
      }
    } catch (error) {
      toast.error("Error al crear la compra");
      console.error(error);
    }
  };

  return (
    <div className="captureReceiptData" id="captureReceiptData">
      <div className="inner">
        <h1>Datos de facturación</h1>
        <div className="grid">
          <div className="n1">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            {errors.nombre && <div className="error">{errors.nombre}</div>}
          </div>
          <div className="n2">
            <label htmlFor="cedula">Cédula o NIT</label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleInputChange}
            />
            {errors.cedula && <div className="error">{errors.cedula}</div>}
          </div>
          <div className="n3">
            <label htmlFor="correo">Correo</label>
            <input
              type="text"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
            />
            {errors.correo && <div className="error">{errors.correo}</div>}
          </div>
          <div className="n4">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
            />
            {errors.direccion && (
              <div className="error">{errors.direccion}</div>
            )}
          </div>
          <div className="n5">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
            {errors.telefono && <div className="error">{errors.telefono}</div>}
          </div>
          <div className="n6">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
            />
            {errors.ciudad && <div className="error">{errors.ciudad}</div>}
          </div>
        </div>
        <div className="additional">
          <h1>Dirección de envío</h1>
          <input
            type="text"
            name="direccionEnvio"
            value={formData.direccionEnvio}
            onChange={handleInputChange}
          />
          {errors.direccionEnvio && (
            <div className="error">{errors.direccionEnvio}</div>
          )}
        </div>
        <div className="confirm">
          <button disabled={deActive} onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
