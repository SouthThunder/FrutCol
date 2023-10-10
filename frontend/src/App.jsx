import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Homecom} from './home/home.jsx';
import {InfoCuentacom} from './info_cuenta/info_cuenta.jsx';
import {Ingresocom} from './ingreso/ingreso.jsx';
import {InterfazAdmincom} from './interfaz_admin/interfaz_admin.jsx';
import {QuienesSomoscom} from './quienes_somos/quienes_somos.jsx';
import {Registrocom} from './registro/registro.jsx';
import { Producto } from "./home/cartSlice.js";
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import LoadingSpinner from "./loading/LoadingSpinner";


export const App= () =>{
  const [product, setProduct] = useState(null);
  const [prodsPool, setProdsPool] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [lProductos, setLProductos] = useState(null);
  const [token, setToken] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [user, setUser] = useState([]);
  const firstRender = useRef(true);
  const firstSet = useRef(true);

  useEffect(() => {
    
    if (firstRender.current) {
       getProducts(); 
      firstRender.current = false;
    } else {
      if (prodsPool !== null && firstSet.current === true) {
        setProduct(prodsPool[0]);
        if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
          setItems(false)
        }else{
          setItems(true)
        }
        if (product !== null && lProductos!==null) {
          firstSet.current = false;
          setisLoading(false);
        }
      }
    }
  }, [prodsPool, product, lProductos]);

  const setItems = async(cond) => {
    if(cond){
      setToken(jwt_decode(localStorage.getItem('token')))
       setHeaders(() =>{
        return {
          Authorization: `${localStorage.getItem("token")}`, // Agrega "Bearer" antes del token si es necesario
        };
      })
      setUser(true)
      getProductsFromCart();
    }else{
      setHeaders(null)
      setToken(null)
      setUser(false)
      setProducts();
    }
  }

  const getProducts = async () => {
    const URI = "https://frutcol-backend.onrender.com/metadata";
    try {
      const response = await axios.get(URI);
      setProdsPool(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const setProducts = () => {
    setLProductos(() =>
      prodsPool.map((prod) => {
        return new Producto(
          prod.id_metadata_producto,
          prod.nombre_producto,
          prod.precio_producto,
          0,
          prod.image
        );
      })
    );
  };

  const getProductsFromCart = async () => {
    const headers= {
      Authorization: `${localStorage.getItem("token")}`, // Agrega "Bearer" antes del token si es necesario
    }
    const token= jwt_decode(localStorage.getItem("token"));
    const URI = `https://frutcol-backend.onrender.com/carrito/${token.id_usuario}`;
    try {
      const res = await axios.get(URI, {
        headers
      });
      setLProductos(() =>
        prodsPool.map((prod) => {
          const it = res.data.find(
            (lproduc) => lproduc.id_producto === prod.id_metadata_producto
          );
          if (it === undefined) {
            return new Producto(
              prod.id_metadata_producto,
              prod.nombre_producto,
              prod.precio_producto,
              0,
              prod.image,
              false
            );
          } else {
            return new Producto(
              it.id_producto,
              prod.nombre_producto,
              prod.precio_producto,
              it.cantidad_producto,
              prod.image,
              true
            );
          }
        })
      );
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const refresh= () => window.location.reload(true)


  const changeProp = (element) => {
    setProduct(element);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="principalContainer">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homecom product={product} changeProp={changeProp} prodsPool={prodsPool} lProductos={lProductos} user={user} headers={headers} token={token}/>}/>
          <Route path='/InformacionCuenta' element={<InfoCuentacom product={product} prodsPool={prodsPool}/>}/>
          <Route path='/Ingreso' element={<Ingresocom refresh={refresh}/>}/>
          <Route path='/InterfazAdmin' element={<InterfazAdmincom product={product} prodsPool={prodsPool}/>}/>
          <Route path='/QuienesSomos' element={<QuienesSomoscom product={product}/>}/>
          <Route path='/Registro' element={<Registrocom refresh={refresh}/>}/>
          
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
