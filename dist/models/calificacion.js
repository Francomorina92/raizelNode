"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const Calificacion = conecction_1.default.define('Calificaciones', {
    mensaje: {
        type: sequelize_1.DataTypes.STRING
    },
    calificacion: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idPerfil: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = Calificacion;
//# sourceMappingURL=calificacion.js.map