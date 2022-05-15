"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const Ejercicio = conecction_1.default.define('Ejercicios', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    color: {
        type: sequelize_1.DataTypes.STRING
    },
    preparacion: {
        type: sequelize_1.DataTypes.STRING
    },
    ejecucion: {
        type: sequelize_1.DataTypes.STRING
    },
    detalles: {
        type: sequelize_1.DataTypes.STRING
    },
    idCategoria: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idMusculoPrincipal: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idMusculoSecundario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idEquipamiento: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idPerfil: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Ejercicio;
//# sourceMappingURL=ejercicio.js.map