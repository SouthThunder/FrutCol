import express from 'express';
import cors from 'cors';

//Importing the Database Connection
import db from './DataBase/db.js';

//Importar enrutadores
import productoRoutes from './Routes/Producto.routes.js'
import reservaRoutes from './Routes/Reserva.routes.js'
import usuarioRoutes from './Routes/Usuario.routes.js'


const app = express();

app.use(cors());
app.use(express.json());

//endpoints
app.use('/productos',productoRoutes)
app.use('/reserva',reservaRoutes)
app.use('/usuarios',usuarioRoutes)


//console.clear();

//connection 
try {
    await db.authenticate();
    console.log('The connection to the DataBase was successful');
} catch (error) {
    console.error(`The error is: ${error}`);
}
//end connection

//manejar la vaiable de entorno si existe
const port = process.env.PORT || 8000;
//const port = 8000;

app.listen(port, ()=>{
    console.log('Server Up running in http://localhost:' + port + '/');
})