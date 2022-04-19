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
exports.deleteRutina = exports.putRutina = exports.postRutina = exports.getRutina = exports.getRutinas = void 0;
const rutina_1 = __importDefault(require("../models/rutina"));
const getRutinas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 1, orden = 'asc', campo = 'nombre' } = req.query;
    const rutinas = yield rutina_1.default.findAndCountAll({
        limit: Number(limite),
        offset: Number(desde),
        order: [[String(campo), String(orden)]]
    });
    res.json({ rutinas });
});
exports.getRutinas = getRutinas;
const getRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rutina = yield rutina_1.default.findByPk(id);
    if (rutina) {
        res.json(rutina);
    }
    else {
        res.status(404).json({
            msg: `No existe una rutina con el id ${id}`
        });
    }
});
exports.getRutina = getRutina;
const postRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { nombre, idPerfil } = req.body;
    try {
        //Guardamos en BD
        const rutina = yield rutina_1.default.create({ nombre, idPerfil, estado: 1 });
        res.json(rutina);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postRutina = postRutina;
const putRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { nombre, idPerfil, estado } = req.body;
    try {
        const rutina = yield rutina_1.default.findByPk(id);
        if (!rutina) {
            return res.status(404).json({
                msg: `No existe una rutina con el id ${id}`
            });
        }
        yield rutina.update({ nombre, idPerfil, estado });
        res.json({ msg: 'Rutina actualizada perfectamente' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putRutina = putRutina;
const deleteRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rutina = yield rutina_1.default.findByPk(id);
    if (!rutina) {
        return res.status(404).json({
            msg: `No existe una rutina con el id ${id}`
        });
    }
    //await rutina.destroy();
    yield rutina.update({ estado: false });
    res.json({
        msg: 'Rutina borrada'
    });
});
exports.deleteRutina = deleteRutina;
//# sourceMappingURL=rutina.js.map