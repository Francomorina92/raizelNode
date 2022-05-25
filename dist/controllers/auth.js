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
exports.confirmacionEmail = exports.tokenValido = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Verificar si el mail existe
        const usuario = yield usuario_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El email no es correcto'
            });
        }
        else if (!usuario.getDataValue('estado')) {
            //Si el usuario no esta activo
            return res.status(400).json({
                msg: 'El usuario esta inactivo'
            });
        }
        else if (!usuario.getDataValue('verificado')) {
            //Si el usuario no esta activo
            return res.status(400).json({
                msg: 'Debe confirmar el email'
            });
        }
        //Verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.getDataValue('password'));
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            });
        }
        //Generar el JWT
        const token = yield (0, generar_jwt_1.generarJWT)(usuario.getDataValue('id'));
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
const tokenValido = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
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
        res.json({
            token: true
        });
    }
    catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
});
exports.tokenValido = tokenValido;
const confirmacionEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            msg: 'El link no es valido'
        });
    }
    try {
        //validar el token
        const secretKey = process.env.SECRETORPRIVATEKEYREGISTRO || '';
        const { uid } = jsonwebtoken_1.default.verify(token, secretKey);
        req.uid = uid;
        const user = yield usuario_1.default.findByPk(uid);
        //Verificar si el user esta activo
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario`
            });
        }
        if (user.estado) {
            return res.status(400).json({
                msg: `El usuario esta inactivo`
            });
        }
        if (!user.confirmacion != token) {
            return res.status(400).json({
                msg: `El link no es valido. Vuelva a intentarlo`
            });
        }
        yield user.update({ confirmacion: '0', verificado: true });
        res.json({
            verificado: true
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Enlace No valido. Vuelva a pedir el mail de confirmacion'
        });
    }
});
exports.confirmacionEmail = confirmacionEmail;
//# sourceMappingURL=auth.js.map