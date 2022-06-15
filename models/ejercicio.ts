import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Ejercicio= db.define('Ejercicios',{
    nombre: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    },
    preparacion: {
        type: DataTypes.STRING
    },
    ejecucion: {
        type: DataTypes.STRING
    },
    detalles: {
        type: DataTypes.STRING
    },
    idCategoria: {
        type: DataTypes.INTEGER
    },
    idMusculoPrincipal: {
        type: DataTypes.INTEGER
    },
    idMusculoSecundario: {
        type: DataTypes.INTEGER
    },
    idEquipamiento: {
        type: DataTypes.INTEGER
    },
    idPerfil: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    tiempo: {
        type: DataTypes.INTEGER
    },
    img: {
        type: DataTypes.STRING
    },
});

export default Ejercicio;
