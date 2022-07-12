"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const Perfil = conecction_1.default.define('Perfiles', {
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING
    },
    facebook: {
        type: sequelize_1.DataTypes.STRING
    },
    twitter: {
        type: sequelize_1.DataTypes.STRING
    },
    instagram: {
        type: sequelize_1.DataTypes.STRING
    },
    web: {
        type: sequelize_1.DataTypes.STRING
    },
    img: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = Perfil;
//# sourceMappingURL=perfil.js.map