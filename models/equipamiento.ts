import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Equipamiento= db.define('Equipamientos',{
    nombre: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});

export default Equipamiento;
