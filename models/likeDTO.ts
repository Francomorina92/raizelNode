import { DataTypes } from "sequelize";
import db from "../db/conecction";

const LikeDTO= db.define('Likes',{
    cantidad: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    mes: {
        type: DataTypes.INTEGER
    },
    idRutina: {
        type: DataTypes.INTEGER
    },
});

export default LikeDTO;
