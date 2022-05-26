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
exports.DeleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const perfil_1 = __importDefault(require("../models/perfil"));
const { QueryTypes } = require('sequelize');
const conecction_1 = __importDefault(require("../db/conecction"));
const mailer_1 = require("../mailer");
const generar_jwt_1 = require("../helpers/generar-jwt");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 1, orden = 'asc', campo = 'id', filtro = '' } = req.query;
    let usuarios = null;
    const rows = yield conecction_1.default.query('call getUsuarios(:filtro, :limite, :desde, :orden, :campo)', {
        replacements: { filtro, limite, desde, orden, campo },
        model: usuario_1.default,
        type: QueryTypes.SELECT
    });
    usuarios = rows[0];
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    let { password, email, img = '', nombre } = req.body;
    email = email.toUpperCase();
    try {
        //Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        const pass = bcryptjs_1.default.hashSync(password, salt);
        //Guardamos en BD
        const usuario = yield usuario_1.default.create({ password: pass, email, rol: 'USER_ROLE', img, google: false, estado: 1 });
        if (!usuario) {
            res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }
        const perfil = yield perfil_1.default.create({ nombre: nombre, estado: 1, idUsuario: usuario.id });
        //Generar el JWT
        const token = yield (0, generar_jwt_1.generarJWTRegistro)(usuario.getDataValue('id'));
        try {
            // send mail with defined transport object
            yield mailer_1.transporter.sendMail({
                from: '"Registro 👻" <raizel@gmail.com>',
                to: usuario.email,
                subject: "Confirma tu dirección de correo electrónico en Raizel",
                //text: "Hello world?", // plain text body
                html: `
                <div style="margin-left: 20px;">
                <p>Hola, <span style="color: #2CB1BC;">${perfil.nombre}</span> </p> 
            
                <p>    Acabas de crear una cuenta de Raizel. Para completar el registro, tan solo tienes que verificar tu dirección de correo electrónico. Pulsa en el botón de aquí abajo:</p> <br>
                <div style="display: block;
                text-align: center;">
                <a href="https://local:8080/confirmacion/tk=${token}" 
                style="background-color: #2CB1BC;
                    color: white;
                    padding: 15px 25px;
                    text-decoration: none;">COMPLETA TU REGISTRO</a>
                </div>
                <br>  
                
                <p>o copia y pega la siguiente URL en la barra de direcciones de tu navegador: https://local:8080/confirmacion/${token}</p>
                <p>¡y comienza tu aventura ya!</p>
                
                <p>Saludos. El equipo de Raizel</p>
            </div>                
                `,
            });
            yield usuario.update({ confirmacion: token });
        }
        catch (error) {
            res.status(400).json({
                msg: 'Ocurrio un error al enviar el mail'
            });
        }
        res.json({ usuario, perfil });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { password, email, role, img } = req.body;
    email = email.toUpperCase();
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        yield usuario.update({ email, role, img });
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const DeleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
    //await usuario.destroy();
    yield usuario.update({ estado: false });
    res.json({
        msg: 'usuario borrado'
    });
});
exports.DeleteUsuario = DeleteUsuario;
//# sourceMappingURL=usuario.js.map