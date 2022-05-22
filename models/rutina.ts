import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Rutina= db.define('Rutinas',{
    idPerfil: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    calificacion: {
        type: DataTypes.DOUBLE
    },
});

export default Rutina;
