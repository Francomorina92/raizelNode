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
exports.deleteCategoria = exports.putCategoria = exports.postCategoria = exports.getCategoria = exports.getCategorias = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0, orden = 'asc', campo = 'nombre' } = req.query;
    const categorias = yield categoria_1.default.findAndCountAll({
        limit: Number(limite),
        offset: Number(desde),
        order: [[String(campo), String(orden)]]
    });
    res.json({ categorias });
});
exports.getCategorias = getCategorias;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByPk(id);
    if (categoria) {
        res.json(categoria);
    }
    else {
        res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        });
    }
});
exports.getCategoria = getCategoria;
const postCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { nombre, estado = 1 } = req.body;
    try {
        //Guardamos en BD
        const categoria = yield categoria_1.default.create({ nombre, estado });
        res.json(categoria);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postCategoria = postCategoria;
const putCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { nombre, estado } = req.body;
    try {
        const categoria = yield categoria_1.default.findByPk(id);
        if (!categoria) {
            return res.status(404).json({
                msg: `No existe una categoria con el id ${id}`
            });
        }
        yield categoria.update({ nombre, estado });
        res.json(categoria);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putCategoria = putCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByPk(id);
    if (!categoria) {
        return res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        });
    }
    //await categoria.destroy();
    yield categoria.update({ estado: false });
    res.json({
        msg: 'Categoria borrada'
    });
});
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categoria.js.map