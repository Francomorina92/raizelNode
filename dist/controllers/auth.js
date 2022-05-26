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
exports.cambiarPassword = exports.recuperar = exports.confirmacionEmail = exports.tokenValido = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const mailer_1 = require("../mailer");
const generar_jwt_1 = require("../helpers/generar-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const perfil_1 = __importDefault(require("../models/perfil"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    email = email.toUpperCase();
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
        if (user.confirmacion != token) {
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
const recuperar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email } = req.body;
    email = email.toUpperCase();
    if (!email) {
        return res.status(400).json({
            msg: 'El email es obligatorio'
        });
    }
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
        const perfil = yield perfil_1.default.findOne({
            where: {
                idUsuario: usuario.getDataValue('id')
            }
        });
        //Generar el JWT
        const token = yield (0, generar_jwt_1.generarJWTRegistro)(usuario.getDataValue('id'));
        yield mailer_1.transporter.sendMail({
            from: '"Recuperar contraseña 👻" <raizel@gmail.com>',
            to: usuario.email,
            subject: "Recupero de contraseña",
            html: `
            <div style="margin: 0 auto; width: 80%">
            <p>Hola, <span style="color: #2CB1BC;">${perfil.nombre}</span> </p> 
        
            <p>Recibimos un pedido para recuperar tu contraseña. Sólo es necesario que hagas click para seguir las instrucciones. Pulsa en el botón de aquí abajo:</p> <br>
            <div style="display: block;
            text-align: center;">
            <a href="https://local:8080/recuperacion/${token}" 
            style="background-color: #2CB1BC;
                color: white;
                padding: 15px 25px;
                text-decoration: none;">Recuperar Contraseña</a>
            </div>
            <br>  
            
            <p>o copia y pega la siguiente URL en la barra de direcciones de tu navegador: https://local:8080/recuperacion/${token}</p>
            <p>Este mensaje es confidencial.
            Si usted ha recibido este e-mail por error, debera eliminarlo de su sistema.
            No debera copiar el mensaje ni divulgar su contenido a ninguna persona.
            Muchas gracias.</p>
            
            <p>Saludos. El equipo de Raizel</p>
        </div>                
            `,
        });
        yield usuario.update({ recuperacion: token });
        res.json({
            recuperado: true
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error al recuperar el usuario'
        });
    }
});
exports.recuperar = recuperar;
const cambiarPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = req.body;
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
        if (!user.estado) {
            return res.status(400).json({
                msg: `El usuario esta inactivo`
            });
        }
        if (user.recuperacion != token) {
            return res.status(400).json({
                msg: `El link no es valido. Vuelva a intentarlo`
            });
        }
        //Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        const pass = bcryptjs_1.default.hashSync(password, salt);
        yield user.update({ recuperacion: '0', password: pass });
        res.json({
            correcto: true
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Enlace No valido. Vuelva a pedir el cambio de contraseña'
        });
    }
});
exports.cambiarPassword = cambiarPassword;
//# sourceMappingURL=auth.js.map