import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { addToCart } from "../redux/cartSlice";
import Cookie from "js-cookie";
import Routing from "../navigation/Routes";
//import services methods
import { authToken } from "../services/user";
import { getItems } from "../services/cart.js";

function App() {
  const [auth, setAuth] = useState(false);
  const firstLoad = useRef(true);
  const dispatch = useDispatch();

  const verifyToken = async () => {
    const res = await authToken(Cookie.get("token"));
    if (res?.status === 200) {
      dispatch(login(res.data));
      setAuth(true);
      getCart();
    } else {
      setAuth(false);
    }
  };

  const getCart = async () => {
    try {
      const res = await getItems(Cookie.get("token"));
      let items = [];
      res.map((prod) => {
        const item ={
          id_producto: prod.id_producto,
          nombre_producto: prod.SubMetadata_producto.nombre_producto,
          precio_producto: prod.SubMetadata_producto.precio_producto,
          cantidad_producto: prod.cantidad_producto,
          image: prod.SubMetadata_producto.image,
          peso_producto: prod.SubMetadata_producto.peso_producto,
        }
        items.push(item);
      });
      if(!localStorage.getItem('cart')){
        return items.map((item) => {
          return dispatch(addToCart(item));
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Cookie.get("token") && firstLoad.current) {
      verifyToken();
      firstLoad.current = false;
    }
  }, []);

  return <Routing authenticated={auth} />;
}

export default App;
