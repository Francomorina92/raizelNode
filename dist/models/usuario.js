"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const Usuario = conecction_1.default.define('Usuario', {
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    img: {
        type: sequelize_1.DataTypes.STRING
    },
    rol: {
        type: sequelize_1.DataTypes.STRING
    },
    google: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    confirmacion: {
        type: sequelize_1.DataTypes.STRING
    },
    recuperacion: {
        type: sequelize_1.DataTypes.STRING
    },
    verificado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
Usuario.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
};
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map