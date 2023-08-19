import express from 'express';
import cors from 'cors';

//Importing the Database Connection
import db from './DataBase/db.js';

const app = express();

app.use(cors());
app.use(express.json());


console.clear();

//connection 
try {
    await db.authenticate();
    console.log('The connection to the DataBase was successful');
} catch (error) {
    console.error(`The error is: ${error}`);
}
//end connection


const port=8000;

app.listen(port, ()=>{
    console.log('Server Up running in http://localhost:' + port + '/');
})