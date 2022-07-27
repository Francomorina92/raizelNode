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
exports.getMeGustasUltimos = exports.getMeGustasTotales = exports.deleteLike = exports.putLike = exports.postLike = exports.getLike = exports.getLikes = void 0;
const like_1 = __importDefault(require("../models/like"));
const { QueryTypes } = require('sequelize');
const conecction_1 = __importDefault(require("../db/conecction"));
const perfil_1 = __importDefault(require("../models/perfil"));
const likeDTO_1 = __importDefault(require("../models/likeDTO"));
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 1, orden = 'desc', campo = 'updatedAt', rutina = 1 } = req.query;
    const rows = yield conecction_1.default.query('call getLikes(:rutina, :limite, :desde, :orden, :campo)', {
        replacements: { rutina, limite, desde, orden, campo },
        model: like_1.default,
        type: QueryTypes.SELECT
    });
    const likes = rows[0];
    res.json({ likes });
});
exports.getLikes = getLikes;
const getLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rutina, perfil } = req.body;
    const like = yield like_1.default.findAll({
        where: {
            idRutina: rutina,
            idPerfil: perfil,
            estado: true
        }
    });
    if (like[0] != undefined) {
        res.json(true);
    }
    else {
        res.json(false);
    }
});
exports.getLike = getLike;
const postLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { idPerfil, idRutina, like } = req.body;
    try {
        let likeBase = yield like_1.default.findAll({
            where: {
                idRutina: idRutina,
                idPerfil: idPerfil
            }
        });
        if (likeBase[0] != undefined) {
            yield likeBase[0].update({ idPerfil, idRutina, estado: like });
            res.json(like);
        }
        else {
            yield like_1.default.create({ idPerfil, idRutina, estado: 1 });
            res.json(true);
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postLike = postLike;
const putLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { idPerfil, idRutina, estado } = req.body;
    try {
        const like = yield like_1.default.findByPk(id);
        if (!like) {
            return res.status(404).json({
                msg: `No existe un like con el id ${id}`
            });
        }
        yield like.update({ idPerfil, idRutina, estado });
        res.json({ msg: 'Like actualizado perfectamente' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putLike = putLike;
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const like = yield like_1.default.findByPk(id);
    if (!like) {
        return res.status(404).json({
            msg: `No existe un like con el id ${id}`
        });
    }
    //await like.destroy();
    yield like.update({ estado: false });
    res.json({
        msg: 'Like borrado'
    });
});
exports.deleteLike = deleteLike;
const getMeGustasTotales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    const { id } = req.user;
    const per = yield perfil_1.default.findOne({
        where: {
            idUsuario: id
        }
    });
    const idP = per.id;
    const rows = yield conecction_1.default.query('call getMeGustasTotales(:idP)', {
        replacements: { idP },
        model: likeDTO_1.default,
        type: QueryTypes.SELECT
    });
    const likes = rows[0];
    res.json({ likes });
});
exports.getMeGustasTotales = getMeGustasTotales;
const getMeGustasUltimos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    const { id } = req.user;
    const per = yield perfil_1.default.findOne({
        where: {
            idUsuario: id
        }
    });
    const idP = per.id;
    let fechaActual = new Date();
    /* fechaActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDay()); */
    let desde = new Date();
    desde.setMonth(desde.getMonth() - 2);
    const rows = yield conecction_1.default.query('call getMeGustasUltimos(:idP, :desde, :fechaActual)', {
        replacements: { idP, desde, fechaActual },
        model: likeDTO_1.default,
        type: QueryTypes.SELECT
    });
    const likes = rows[0];
    res.json({ likes });
    /* res.json('ok'); */
});
exports.getMeGustasUltimos = getMeGustasUltimos;
//# sourceMappingURL=like.js.map