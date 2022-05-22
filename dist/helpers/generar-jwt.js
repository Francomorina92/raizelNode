"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWTRegistro = exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        const secretkey = process.env.SECRETORPRIVATEKEY || '';
        jsonwebtoken_1.default.sign(payload, secretkey, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
const generarJWTRegistro = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        const secretkey = process.env.SECRETORPRIVATEKEYREGISTRO || '';
        jsonwebtoken_1.default.sign(payload, secretkey, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWTRegistro = generarJWTRegistro;
//# sourceMappingURL=generar-jwt.js.map