import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Like= db.define('Likes',{
    idPerfil: {
        type: DataTypes.INTEGER
    },
    idRutina: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});

export default Like;
