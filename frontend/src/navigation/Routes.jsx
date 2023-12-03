import { useRef, useEffect, useState } from 'react';
import Cookie from "js-cookie";
import { gapi } from 'gapi-script';
//import components
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Headercom } from '../components/common/header/header.jsx';
import { Footercom } from '../components/common/footer/footer.jsx';
import {Homecom} from '../components/pages/home/home.jsx';
import {InfoCuentacom} from '../components/pages/info_cuenta/info_cuenta.jsx';
import {Ingresocom} from '../components/pages/ingreso/ingreso.jsx';
import {InterfazAdmincom} from '../components/pages/interfaz_admin/interfaz_admin.jsx';
import {QuienesSomoscom} from '../components/pages/quienes_somos/quienes_somos.jsx';
import {Registrocom} from '../components/pages/registro/registro.jsx';
import {PrivacyComp} from '../components/pages/privacy/privacy.jsx';
import { Producto } from "../components/pages/home/cartSlice.js";
import { Carritocom } from '../components/pages/carrito/carrito.jsx';
import { Selement } from '../components/pages/s_element/s_element.jsx';
import LoadingSpinner from '../components/common/loading/LoadingSpinner.jsx';
import PrivateRoutes from '../utils/PrivateRoute.js';
//Import services 
import { getProducts } from '../services/products.js';
import { getItems } from '../services/cart.js';

gapi.load('client:auth2', () => {
  gapi.client.init({
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      plugin_name: 'chat',
  });
});
function Routing ({authenticated}) {
  const [product, setProduct] = useState(null);
  const [prodsPool, setProdsPool] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [lProductos, setLProductos] = useState(null);
  const [user, setUser] = useState([]);
  const firstRender = useRef(true);
  const firstSet = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      fetchProducts()
      firstRender.current = false;
    } else {
      if (prodsPool !== null && firstSet.current === true) {
        const firstprod = prodsPool.map((prod) => {
          return prod
        })
        setProduct(firstprod[0]);
        if(!authenticated){
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

  const fetchProducts = async () => {
    try {
      setProdsPool(await getProducts());
    } catch (error) {
      console.error("ERROR: " + error);
    }
  }

  
  const getProductsFromCart = async () => {
    try {
      const res = await getItems(Cookie.get("token"))
      setLProductos(() => prodsPool
        .map((prod) => {
          return prod.SubMetadata_productos.map((sub) => {
            const it = res.find(
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
    )
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
      <Headercom product={product} auth={authenticated}/>
        <Routes>
          <Route exact path='/' element={<Homecom product={product} changeProp={changeProp} prodsPool={prodsPool} user={user}/>}/>
          <Route path='/Ingreso' element={<Ingresocom refresh={refresh}/>}/>
          <Route path='/registro' element={<Registrocom refresh={refresh}/>}/> 
          <Route path='/QuienesSomos' element={<QuienesSomoscom product={product}/>}/> 
          <Route path='/Privacidad' element={<PrivacyComp product={product}/>}/>
          {/* Protected routes */}
          <Route element={<PrivateRoutes />}>
            <Route path='/InformacionCuenta' element={<InfoCuentacom product={product} prodsPool={prodsPool}/>}/>
            <Route path='/InterfazAdmin' element={<InterfazAdmincom product={product} prodsPool={prodsPool}/>}/> 
            <Route path='/carrito' element={<Carritocom product={product} lProductos={lProductos}/>}/>
            <Route path='/:id' element={<Selement product={product} lProductos={lProductos} updateLProducts={updateLProducts}/>}/>
          </Route>
        </Routes>
      <Footercom product={product}/>
      </BrowserRouter>    
    </div>
  );
}

export default Routing;
