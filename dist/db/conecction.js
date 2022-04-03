"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('raizel', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = db;
//# sourceMappingURL=conecction.js.map