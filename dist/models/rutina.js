"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const Rutina = conecction_1.default.define('Rutinas', {
    idPerfil: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    calificacion: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    musculoPrincipal: {
        type: sequelize_1.DataTypes.STRING
    },
    tiempo: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    img: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.default = Rutina;
//# sourceMappingURL=rutina.js.map