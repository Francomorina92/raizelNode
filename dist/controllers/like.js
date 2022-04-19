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
exports.deleteLike = exports.putLike = exports.postLike = exports.getLike = exports.getLikes = void 0;
const like_1 = __importDefault(require("../models/like"));
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 1, orden = 'desc', campo = 'updatedAt' } = req.query;
    const likes = yield like_1.default.findAndCountAll({
        limit: Number(limite),
        offset: Number(desde),
        order: [[String(campo), String(orden)]]
    });
    res.json({ likes });
});
exports.getLikes = getLikes;
const getLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const like = yield like_1.default.findByPk(id);
    if (like) {
        res.json(like);
    }
    else {
        res.status(404).json({
            msg: `No existe un like con el id ${id}`
        });
    }
});
exports.getLike = getLike;
const postLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { idPerfil, idRutina } = req.body;
    try {
        //Guardamos en BD
        const like = yield like_1.default.create({ idPerfil, idRutina, estado: 1 });
        res.json(like);
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
//# sourceMappingURL=like.js.map