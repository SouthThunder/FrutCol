import db from "../DataBase/db.js";
import { DataTypes } from "sequelize";

const Reserva_productoModel = db.define('Reserva_producto', {
    id_reserva_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    id_reserva: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


export default Reserva_productoModel;