"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('accessToken');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        //validar el token
        const secretKey = process.env.SECRETORPRIVATEKEY || '';
        const { uid } = jsonwebtoken_1.default.verify(token, secretKey);
        req.uid = uid;
        const user = yield usuario_1.default.findByPk(uid);
        //Verificar si el user esta activo
        if (!user) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${uid}`
            });
        }
        if (!user.estado) {
            return res.status(401).json({
                msg: `El usuario con el id ${uid} no esta habilitado`
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
});
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map