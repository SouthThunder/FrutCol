import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Homecom} from './home/home.jsx';
import {InfoCuentacom} from './info_cuenta/info_cuenta.jsx';
import {Ingresocom} from './ingreso/ingreso.jsx';
import {InterfazAdmincom} from './interfaz_admin/interfaz_admin.jsx';
import {QuienesSomoscom} from './quienes_somos/quienes_somos.jsx';
import {RealizarCompracom} from './realizar_compra/realizar_compra.jsx';
import {Registrocom} from './registro/registro.jsx';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import LoadingSpinner from "./loading/LoadingSpinner";


export const App= () =>{
  const [product, setProduct] = useState(null);
  const [prodsPool, setProdsPool] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const firstRender = useRef(true);
  const firstSet = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      getProducts();
      firstRender.current = false;
    } else {
      if (prodsPool !== null && firstSet.current === true) {
        setProduct(prodsPool[0]);
        if (product !== null) {
          firstSet.current = false;
          console.log(product)
          setisLoading(false);
        }
      }
    }
  }, [prodsPool, product]);

  const getProducts = async () => {
    const URI = "https://frutcol-backend.onrender.com/metadata";
    try {
      const response = await axios.get(URI);
      setProdsPool(response.data);
      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

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
          <Route path='/' element={<Homecom product={product} changeProp={changeProp} prodsPool={prodsPool}/>}/>
          <Route path='/InformacionCuenta' element={<InfoCuentacom product={product} prodsPool={prodsPool}/>}/>
          <Route path='/Ingreso' element={<Ingresocom/>}/>
          <Route path='/InterfazAdmin' element={<InterfazAdmincom product={product} />}/>
          <Route path='/QuienesSomos' element={<QuienesSomoscom product={product}/>}/>

          <Route path='/Registro' element={<Registrocom/>}/>
          
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
