import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Categoria= db.define('Categorias',{
    nombre: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});

export default Categoria;
