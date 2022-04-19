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
exports.deleteMusculo = exports.putMusculo = exports.postMusculo = exports.getMusculo = exports.getMusculos = void 0;
const musculo_1 = __importDefault(require("../models/musculo"));
const getMusculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0, orden = 'asc', campo = 'nombre' } = req.params;
    const musculos = yield musculo_1.default.findAndCountAll({
        limit: Number(limite),
        offset: Number(desde),
        order: [[String(campo), String(orden)]]
    });
    res.json({ musculos });
});
exports.getMusculos = getMusculos;
const getMusculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const musculo = yield musculo_1.default.findByPk(id);
    if (musculo) {
        res.json(musculo);
    }
    else {
        res.status(404).json({
            msg: `No existe un musculo con el id ${id}`
        });
    }
});
exports.getMusculo = getMusculo;
const postMusculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { nombre } = req.body;
    try {
        //Guardamos en BD
        const musculo = yield musculo_1.default.create({ nombre, estado: 1 });
        res.json(musculo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postMusculo = postMusculo;
const putMusculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { nombre, estado } = req.body;
    try {
        const musculo = yield musculo_1.default.findByPk(id);
        if (!musculo) {
            return res.status(404).json({
                msg: `No existe un musculo con el id ${id}`
            });
        }
        yield musculo.update({ nombre, estado });
        res.json(musculo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putMusculo = putMusculo;
const deleteMusculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const musculo = yield musculo_1.default.findByPk(id);
    if (!musculo) {
        return res.status(404).json({
            msg: `No existe un musculo con el id ${id}`
        });
    }
    //await categoria.destroy();
    yield musculo.update({ estado: false });
    res.json({
        msg: 'Musculo borrado'
    });
});
exports.deleteMusculo = deleteMusculo;
//# sourceMappingURL=musculo.js.map