"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const CalificacionDTO = conecction_1.default.define('Likes', {
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    calificacion: {
        type: sequelize_1.DataTypes.INTEGER
    },
});
exports.default = CalificacionDTO;
//# sourceMappingURL=calificacionDTO.js.map