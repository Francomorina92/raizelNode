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
exports.deleteEjercicio = exports.putEjercicio = exports.postEjercicio = exports.getEjercicio = exports.getEjercicios = void 0;
const ejercicio_1 = __importDefault(require("../models/ejercicio"));
const { QueryTypes } = require('sequelize');
const conecction_1 = __importDefault(require("../db/conecction"));
const perfil_1 = __importDefault(require("../models/perfil"));
const getEjercicios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { limite = 5, desde = 1, orden = 'desc', campo = 'nombre', filtro = '', id = 0 } = req.query;
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    const per = yield perfil_1.default.findOne({
        where: {
            idUsuario: req.user.id
        }
    });
    if (id == 0) {
        id = per.id;
    }
    let ejercicios = null;
    const rows = yield conecction_1.default.query('call getEjercicios(:filtro, :id, :limite, :desde, :orden, :campo)', {
        replacements: { filtro, id, limite, desde, orden, campo },
        model: ejercicio_1.default,
        type: QueryTypes.SELECT
    });
    ejercicios = rows[0];
    res.json({ ejercicios });
});
exports.getEjercicios = getEjercicios;
const getEjercicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ejercicio = yield ejercicio_1.default.findByPk(id);
    if (ejercicio) {
        res.json(ejercicio);
    }
    else {
        res.status(404).json({
            msg: `No existe un ejercicio con el id ${id}`
        });
    }
});
exports.getEjercicio = getEjercicio;
const postEjercicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { nombre, color, preparacion, ejecucion, detalles, idCategoria, idMusculoPrincipal, idMusculoSecundario, idEquipamiento } = req.body;
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    const per = yield perfil_1.default.findOne({
        where: {
            idUsuario: req.user.id
        }
    });
    const id = per.id;
    try {
        //Guardamos en BD
        const ejercicio = yield ejercicio_1.default.create({ nombre, color, preparacion, ejecucion, detalles, idCategoria, idMusculoPrincipal, idMusculoSecundario, idEquipamiento, idPerfil: id, estado: 1 });
        res.json(ejercicio);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postEjercicio = postEjercicio;
const putEjercicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, color, preparacion, ejecucion, detalles, idCategoria, idMusculoPrincipal, idMusculoSecundario, idEquipamiento, idPerfil, estado } = req.body;
    try {
        const ejercicio = yield ejercicio_1.default.findByPk(id);
        if (!ejercicio) {
            return res.status(404).json({
                msg: `No existe un ejercicio con el id ${id}`
            });
        }
        yield ejercicio.update({ nombre, color, preparacion, ejecucion, detalles, idCategoria, idMusculoPrincipal, idMusculoSecundario, idEquipamiento, idPerfil, estado });
        res.json(ejercicio);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putEjercicio = putEjercicio;
const deleteEjercicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ejercicio = yield ejercicio_1.default.findByPk(id);
    if (!ejercicio) {
        return res.status(404).json({
            msg: `No existe un ejercicio con el id ${id}`
        });
    }
    //await ejercicio.destroy();
    yield ejercicio.update({ estado: false });
    res.json({
        msg: 'Ejercicio borrado'
    });
});
exports.deleteEjercicio = deleteEjercicio;
//# sourceMappingURL=ejercicio.js.map