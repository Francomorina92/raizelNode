import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Calificacion= db.define('Calificaciones',{
    mensaje: {
        type: DataTypes.STRING
    },
    calificacion: {
        type: DataTypes.INTEGER
    },
    idPerfil: {
        type: DataTypes.INTEGER
    },
    idUsuario: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});

export default Calificacion;
