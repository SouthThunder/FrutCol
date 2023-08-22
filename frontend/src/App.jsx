import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Homecom} from './home/home.jsx';
import {Carritocom} from './carrito/carrito.jsx';
import {InfoCuentacom} from './info_cuenta/info_cuenta.jsx';
import {Ingresocom} from './ingreso/ingreso.jsx';
import {InterfazAdmincom} from './interfaz_admin/interfaz_admin.jsx';
import {QuienesSomoscom} from './quienes_somos/quienes_somos.jsx';
import {RealizarCompracom} from './realizar_compra/realizar_compra.jsx';
import {Registrocom} from './registro/registro.jsx';

export const App= () =>{
  return (
    <div className="principalContainer">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homecom/>}/>
          <Route path='/Carrito' element={<Carritocom/>}/>
          <Route path='/InformacionCuenta' element={<InfoCuentacom/>}/>
          <Route path='/Ingreso' element={<Ingresocom/>}/>
          <Route path='/IterfazAdmin' element={<InterfazAdmincom/>}/>
          <Route path='/QuienesSomos' element={<QuienesSomoscom/>}/>
          <Route path='/RealizarCompra' element={<RealizarCompracom/>}/>
          <Route path='/Registro' element={<Registrocom/>}/>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
