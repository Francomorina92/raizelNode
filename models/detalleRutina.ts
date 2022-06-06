import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Detalle= db.define('DetallesRutina',{
    idRutina: {
        type: DataTypes.INTEGER
    },
    idEjercicio: {
        type: DataTypes.INTEGER
    },
    tipoSerie: {
        type: DataTypes.INTEGER
    },
    cantidadSerie: {
        type: DataTypes.INTEGER
    },
    descanso: {
        type: DataTypes.INTEGER
    },
    repeticionesUno: {
        type: DataTypes.INTEGER
    },
    repeticionesDos: {
        type: DataTypes.INTEGER
    },
    repeticionesTres: {
        type: DataTypes.INTEGER
    },
    repeticionesCuatro: {
        type: DataTypes.INTEGER
    },
    repeticionesCinco: {
        type: DataTypes.INTEGER
    },
    cargaUno: {
        type: DataTypes.DOUBLE
    },
    cargaDos: {
        type: DataTypes.DOUBLE
    },
    cargaTres: {
        type: DataTypes.DOUBLE
    },
    cargaCuatro: {
        type: DataTypes.DOUBLE
    },
    cargaCinco: {
        type: DataTypes.DOUBLE
    },
    unidad: {
        type: DataTypes.INTEGER
    },
    observaciones: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    /* parte del ejercicio en si */
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
    }
});

export default Detalle;
