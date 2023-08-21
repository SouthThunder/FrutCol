import {Sequelize} from 'sequelize';

//const db = new Sequelize('nombre de la base de datos', 'usuario', 'contraseña, objeto el cual indica el host y la base de datos que se esta utilizando',
const db = new Sequelize('frutcola', 'hxgx7yk6oimdoljdtbbe', 'pscale_pw_JZB82PD3KwoPG2DcywSfL2RUcz2TQANsl404EklWcaj',{
    host: 'aws.connect.psdb.cloud',
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            require: true, // Requerir SSL
            rejectUnauthorized: false // No verificar el certificado SSL (puede ajustarse según necesidades)
        }
    },
    define: {
        timestamps: false,
        freezeTableName: true
    },
    port: '3306' // este es el puerto que utiliza mi base de datos, se configura aca
});

export default db;