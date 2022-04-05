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
const getCalificaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 1, orden = 'desc', campo = 'updatedAt' } = req.query;
    const calificaciones = yield calificacion_1.default.findAndCountAll({
        limit: Number(limite),
        offset: Number(desde),
        order: [[String(campo), String(orden)]]
    });
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
        console.log(error);
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
        res.json({ msg: 'Calificacion actualizada perfectamente' });
    }
    catch (error) {
        console.log(error);
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
//# sourceMappingURL=calificacion%20copy.js.map