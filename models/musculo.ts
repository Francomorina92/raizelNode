import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Musculo= db.define('Musculos',{
    nombre: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});

export default Musculo;
