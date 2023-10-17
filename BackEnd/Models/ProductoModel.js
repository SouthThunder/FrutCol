import db from "../DataBase/db.js";
import { DataTypes } from "sequelize";
import Reserva_productoModel from "./Reserva_productoModel.js";

const ProductoModel = db.define('Producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion_producto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_producto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


ProductoModel.hasMany(Reserva_productoModel,  {
    foreignKey: 'id_producto'
});

Reserva_productoModel.belongsTo(ProductoModel, {
    foreignKey: 'id_producto'
});


export default ProductoModel;