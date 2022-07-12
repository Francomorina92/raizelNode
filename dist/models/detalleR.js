"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const DetalleR = conecction_1.default.define('DetallesRutina', {
    idRutina: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idEjercicio: {
        type: sequelize_1.DataTypes.INTEGER
    },
    tipoSerie: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cantidadSerie: {
        type: sequelize_1.DataTypes.INTEGER
    },
    descanso: {
        type: sequelize_1.DataTypes.INTEGER
    },
    repeticionesUno: {
        type: sequelize_1.DataTypes.INTEGER
    },
    repeticionesDos: {
        type: sequelize_1.DataTypes.INTEGER
    },
    repeticionesTres: {
        type: sequelize_1.DataTypes.INTEGER
    },
    repeticionesCuatro: {
        type: sequelize_1.DataTypes.INTEGER
    },
    repeticionesCinco: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cargaUno: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    cargaDos: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    cargaTres: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    cargaCuatro: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    cargaCinco: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    unidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    observaciones: {
        type: sequelize_1.DataTypes.STRING
    },
    distancia: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = DetalleR;
//# sourceMappingURL=detalleR.js.map