import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Perfil= db.define('Perfiles',{
    idUsuario: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    facebook: {
        type: DataTypes.STRING
    },
    twitter: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    web: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});

export default Perfil;
