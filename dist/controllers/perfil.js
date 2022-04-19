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
exports.deletePerfil = exports.putPerfil = exports.postPerfil = exports.getPerfil = exports.getPerfiles = void 0;
const perfil_1 = __importDefault(require("../models/perfil"));
const getPerfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 1, orden = 'asc', campo = 'nombre' } = req.query;
    const perfiles = yield perfil_1.default.findAndCountAll({
        limit: Number(limite),
        offset: Number(desde),
        order: [[String(campo), String(orden)]]
    });
    res.json({ perfiles });
});
exports.getPerfiles = getPerfiles;
const getPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const perfil = yield perfil_1.default.findByPk(id);
    if (perfil) {
        res.json(perfil);
    }
    else {
        res.status(404).json({
            msg: `No existe un perfil con el id ${id}`
        });
    }
});
exports.getPerfil = getPerfil;
const postPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { nombre, idUsuario, apellido, facebook, twitter, instagram, web } = req.body;
    try {
        //Guardamos en BD
        const perfil = yield perfil_1.default.create({ nombre, idUsuario, apellido, facebook, twitter, instagram, web, estado: 1 });
        res.json(perfil);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postPerfil = postPerfil;
const putPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { nombre, idUsuario, apellido, facebook, twitter, instagram, web, estado } = req.body;
    try {
        const perfil = yield perfil_1.default.findByPk(id);
        if (!perfil) {
            return res.status(404).json({
                msg: `No existe un perfil con el id ${id}`
            });
        }
        yield perfil.update({ nombre, idUsuario, apellido, facebook, twitter, instagram, web, estado });
        res.json({ msg: 'perfil actualizado perfectamente' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putPerfil = putPerfil;
const deletePerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const perfil = yield perfil_1.default.findByPk(id);
    if (!perfil) {
        return res.status(404).json({
            msg: `No existe un perfil con el id ${id}`
        });
    }
    //await perfil.destroy();
    yield perfil.update({ estado: false });
    res.json({
        msg: 'Perfil borrado'
    });
});
exports.deletePerfil = deletePerfil;
//# sourceMappingURL=perfil.js.map