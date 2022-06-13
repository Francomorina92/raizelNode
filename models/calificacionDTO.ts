import { DataTypes } from "sequelize";
import db from "../db/conecction";

const CalificacionDTO= db.define('Likes',{
    cantidad: {
        type: DataTypes.INTEGER
    },
    calificacion: {
        type: DataTypes.INTEGER
    },
});

export default CalificacionDTO;
