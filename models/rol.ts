import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Rol= db.define('Role',{
    nombre: {
        type: DataTypes.STRING
    }
});

export default Rol;