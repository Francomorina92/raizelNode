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
exports.deleteCalificacion = exports.putCalificacion = exports.postCalificacion = exports.getCalificacion = exports.getCalificaciones = void 0;
const calificacion_1 = __importDefault(require("../models/calificacion"));
const { QueryTypes } = require('sequelize');
const conecction_1 = __importDefault(require("../db/conecction"));
const getCalificaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 500, desde = 0, orden = 'desc', campo = 'updatedAt', perfil = 1 } = req.query;
    const rows = yield conecction_1.default.query('call getCalificaciones(:perfil, :limite, :desde, :orden, :campo)', {
        replacements: { perfil, limite, desde, orden, campo },
        model: calificacion_1.default,
        type: QueryTypes.SELECT
    });
    const calificaciones = rows[0];
    res.json({ calificaciones });
});
exports.getCalificaciones = getCalificaciones;
const getCalificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const calificacion = yield calificacion_1.default.findByPk(id);
    if (calificacion) {
        res.json(calificacion);
    }
    else {
        res.status(404).json({
            msg: `No existe una calificacion con el id ${id}`
        });
    }
});
exports.getCalificacion = getCalificacion;
const postCalificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { mensaje, calificacion, idPerfil, idUsuario } = req.body;
    try {
        //Guardamos en BD
        const vCalificacion = yield calificacion_1.default.create({ mensaje, calificacion, idPerfil, idUsuario, estado: 1 });
        res.json(vCalificacion);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postCalificacion = postCalificacion;
const putCalificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { mensaje, calificacion, idPerfil, idUsuario, estado } = req.body;
    try {
        const vCalificacion = yield calificacion_1.default.findByPk(id);
        if (!vCalificacion) {
            return res.status(404).json({
                msg: `No existe una calificacion con el id ${id}`
            });
        }
        yield vCalificacion.update({ mensaje, calificacion, idPerfil, idUsuario, estado });
        res.json(vCalificacion);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putCalificacion = putCalificacion;
const deleteCalificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const calificacion = yield calificacion_1.default.findByPk(id);
    if (!calificacion) {
        return res.status(404).json({
            msg: `No existe una calificacion con el id ${id}`
        });
    }
    //await calificacion.destroy();
    yield calificacion.update({ estado: false });
    res.json({
        msg: 'Calificacion borrada'
    });
});
exports.deleteCalificacion = deleteCalificacion;
//# sourceMappingURL=calificacion.js.map