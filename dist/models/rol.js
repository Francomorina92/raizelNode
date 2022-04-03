"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const Rol = conecction_1.default.define('Role', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Rol;
//# sourceMappingURL=rol.js.map