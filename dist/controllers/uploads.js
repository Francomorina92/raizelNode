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
exports.mostrarImagen = exports.actualizarArchivoCloudinary = exports.actualizarArchivo = exports.cargarArchivo = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const subir_archivo_1 = require("../helpers/subir-archivo");
const usuario_1 = __importDefault(require("../models/usuario"));
const ejercicio_1 = __importDefault(require("../models/ejercicio"));
const rutina_1 = __importDefault(require("../models/rutina"));
const { QueryTypes } = require('sequelize');
const conecction_1 = __importDefault(require("../db/conecction"));
const perfil_1 = __importDefault(require("../models/perfil"));
/* cloudinary.config('cloudinary://687898186776262:LBH4rOuM49gwoHiMvlRgxWQrcOs@raizel'); */
cloudinary_1.v2.config({
    cloud_name: 'raizel',
    api_key: '687898186776262',
    api_secret: 'LBH4rOuM49gwoHiMvlRgxWQrcOs'
});
const cargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos que subir.' });
    }
    try {
        const pathArchivo = yield (0, subir_archivo_1.subirArchivo)(req.files);
        res.json({ nombreArchivo: pathArchivo });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
exports.cargarArchivo = cargarArchivo;
const actualizarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos que subir.' });
    }
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield usuario_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe usuario con el id ${id}` });
            }
            break;
        case 'ejercicios':
            modelo = yield ejercicio_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe ejercicio con el id ${id}` });
            }
            break;
        case 'rutinas':
            const rows = yield conecction_1.default.query('call getRutina(:id)', {
                replacements: { id },
                model: rutina_1.default,
                type: QueryTypes.SELECT
            });
            let row = rows[0];
            modelo = row[0];
            if (!modelo) {
                return res.status(400).json({ msg: `No existe rutina con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' });
    }
    //Limpiar imagenes previas
    try {
        if (modelo.img) {
            const pathImagen = path_1.default.join(__dirname, '../uploads/', coleccion, modelo.img);
            if (fs_1.default.existsSync(pathImagen)) {
                fs_1.default.unlinkSync(pathImagen);
            }
        }
        const pathArchivo = yield (0, subir_archivo_1.subirArchivo)(req.files, undefined, coleccion);
        modelo.update({ img: pathArchivo });
        res.json({ nombreArchivo: pathArchivo, modelo: modelo });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
exports.actualizarArchivo = actualizarArchivo;
const actualizarArchivoCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id, coleccion } = req.params;
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos que subir.' });
    }
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield perfil_1.default.findOne({
                where: {
                    idUSuario: id
                }
            });
            if (!modelo) {
                return res.status(400).json({ msg: `No existe usuario con el id ${id}` });
            }
            break;
        case 'ejercicios':
            modelo = yield ejercicio_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe ejercicio con el id ${id}` });
            }
            break;
        case 'rutinas':
            const rows = yield conecction_1.default.query('call getRutina(:id)', {
                replacements: { id },
                model: rutina_1.default,
                type: QueryTypes.SELECT
            });
            let row = rows[0];
            modelo = row[0];
            if (!modelo) {
                return res.status(400).json({ msg: `No existe rutina con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' });
    }
    //Limpiar imagenes previas
    try {
        if (modelo.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary_1.v2.uploader.destroy(public_id);
        }
        const temporal = (_a = req.files) === null || _a === void 0 ? void 0 : _a.archivo;
        /* res.json({temporal: (temporal as any).tempFilePath}) */
        const respuesta = yield cloudinary_1.v2.uploader.upload(temporal.tempFilePath);
        modelo.update({ img: respuesta.secure_url });
        res.json({ nombreArchivo: respuesta.secure_url });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
exports.actualizarArchivoCloudinary = actualizarArchivoCloudinary;
const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield usuario_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe usuario con el id ${id}` });
            }
            break;
        case 'ejercicios':
            modelo = yield ejercicio_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe ejercicio con el id ${id}` });
            }
            break;
        case 'rutinas':
            const rows = yield conecction_1.default.query('call getRutina(:id)', {
                replacements: { id },
                model: rutina_1.default,
                type: QueryTypes.SELECT
            });
            let row = rows[0];
            modelo = row[0];
            if (!modelo) {
                return res.status(400).json({ msg: `No existe rutina con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' });
    }
    //Limpiar imagenes previas
    try {
        if (modelo.img) {
            const pathImagen = path_1.default.join(__dirname, '../uploads/', coleccion, modelo.img);
            if (fs_1.default.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
    const pathImagen = path_1.default.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);
});
exports.mostrarImagen = mostrarImagen;
//# sourceMappingURL=uploads.js.map