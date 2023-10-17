import db from '../DataBase/db.js';
import { DataTypes } from 'sequelize';
import ReservaModel from './ReservaModel.js';
 
const UsuarioModel = db.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_usuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cedula_usuario:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasena_usuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_usuario:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    direccion_usuario:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

UsuarioModel.hasMany(ReservaModel, {
    foreignKey: 'id_usuario'
});
ReservaModel.belongsTo(UsuarioModel, {
    foreignKey: 'id_usuario'
});

export default UsuarioModel;