import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Homecom} from '../components/pages/home/home.jsx';
import {InfoCuentacom} from '../components/pages/info_cuenta/info_cuenta.jsx';
import {Ingresocom} from '../components/pages/ingreso/ingreso.jsx';
import {InterfazAdmincom} from '../components/pages/interfaz_admin/interfaz_admin.jsx';
import {QuienesSomoscom} from '../components/pages/quienes_somos/quienes_somos.jsx';
import {Registrocom} from '../components/pages/registro/registro.jsx';
import {PrivacyComp} from '../components/pages/privacy/privacy.jsx';
import { Producto } from "../components/pages/home/cartSlice.js";
import { useRef, useEffect, useState } from 'react';
import { Carritocom } from '../components/pages/carrito/carrito.jsx';
import { Selement } from '../components/pages/s_element/s_element.jsx';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import LoadingSpinner from '../components/common/loading/LoadingSpinner.jsx';
import { gapi } from 'gapi-script';
import { Headercom } from '../components/common/header/header.jsx';
import { Footercom } from '../components/common/footer/footer.jsx';

gapi.load('client:auth2', () => {
  gapi.client.init({
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      plugin_name: 'chat',
  });
});
export const App= () =>{
  const [product, setProduct] = useState(null);
  const [prodsPool, setProdsPool] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [lProductos, setLProductos] = useState(null);
  const [user, setUser] = useState([]);
  const firstRender = useRef(true);
  const firstSet = useRef(true);

  useEffect(() => {
    
    if (firstRender.current) {
       getProducts(); 
      firstRender.current = false;
    } else {
      if (prodsPool !== null && firstSet.current === true) {
        const firstprod = prodsPool.map((prod) => {
          return prod
        })
        setProduct(firstprod[0]);
        if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
          setItems(false)
        }else{
          setItems(true)
        }
        if (product !== null) {
          firstSet.current = false;
          setisLoading(false);
        }
      }
    }
  }, [prodsPool, product, lProductos]);

  const setItems = async(cond) => {
    if(cond){
      setUser(true)
      getProductsFromCart();
    }else{
      setUser(false)
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
      setLProductos(() => prodsPool
        .map((prod) => {
          return prod.SubMetadata_productos.map((sub) => {
            const it = res.data.find(
              (lproduc) => lproduc.id_producto === sub.id_subMetadata_producto
            );
            if (it === undefined) {
              return new Producto(
                sub.id_subMetadata_producto,
                sub.nombre_producto,
                sub.precio_producto,
                0,
                sub.image,
                false,
                sub.peso_producto
              );
            }else {
              return new Producto(
                it.id_producto,
                sub.nombre_producto,
                sub.precio_producto,
                it.cantidad_producto,
                sub.image,
                true,
                sub.peso_producto
              );
            }
          })
      })
    );

    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const refresh= () => window.location.reload(true)

  const updateLProducts= (element) =>{
    lProductos.map((prod, index) => {
      prod.map((sub) => {
        if(sub.id === element.id){
          lProductos[index].cantidad = element.cantidad;
        }
      })
    })
  }

  const changeProp = (element) => {
    setProduct(element);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="principalContainer">
      <BrowserRouter>
      <Headercom product={product}/>
        <Routes>
          <Route path='/' element={<Homecom product={product} changeProp={changeProp} prodsPool={prodsPool} user={user}/>}/>
          <Route path='/InformacionCuenta' element={<InfoCuentacom product={product} prodsPool={prodsPool}/>}/>
          <Route path='/Ingreso' element={<Ingresocom refresh={refresh}/>}/>
          <Route path='/InterfazAdmin' element={<InterfazAdmincom product={product} prodsPool={prodsPool}/>}/> 
          <Route path='/QuienesSomos' element={<QuienesSomoscom product={product}/>}/> 
          <Route path='/registro' element={<Registrocom refresh={refresh}/>}/> 
          <Route path='/Privacidad' element={<PrivacyComp product={product}/>}/>
          <Route path='/carrito' element={<Carritocom product={product} lProductos={lProductos}/>}/>
          <Route path='/Privacidad' element={<PrivacyComp product={product} lProductos={lProductos} prodsPool={prodsPool}/>}/>
          <Route path='/:id' element={<Selement product={product} lProductos={lProductos} updateLProducts={updateLProducts}/>}/>
        </Routes>
      <Footercom product={product}/>
      </BrowserRouter>    
    </div>
  );
}

export default App;