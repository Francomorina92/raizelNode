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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        //Verificar si el mail existe
        const usuario = yield usuario_1.default.findOne({
            where: {
                email: correo
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo no es correcto'
            });
        }
        else if (!usuario.getDataValue('estado')) {
            //Si el usuario no esta activo
            return res.status(400).json({
                msg: 'El usuario esta inactivo'
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
//# sourceMappingURL=auth.js.map