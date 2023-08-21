import db from '../DataBase/db.js';
import { DataTypes } from 'sequelize';
import Reserva_productoModel from './Reserva_productoModel.js';

const ReservaModel = db.define('Reserva', {
    id_reserva:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    num_productos_reserva: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor_reserva: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha_reserva: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

ReservaModel.hasMany(Reserva_productoModel, {
    foreignKey: 'id_reserva'
});

Reserva_productoModel.belongsTo(ReservaModel, {
    foreignKey: 'id_reserva'
});

export default ReservaModel;