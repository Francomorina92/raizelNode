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
exports.deleteEquipamiento = exports.putEquipamiento = exports.postEquipamiento = exports.getEquipamiento = exports.getEquipamientos = void 0;
const equipamiento_1 = __importDefault(require("../models/equipamiento"));
const getEquipamientos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0, orden = 'asc', campo = 'nombre' } = req.params;
    const equipamientos = yield equipamiento_1.default.findAndCountAll({
        limit: Number(limite),
        offset: Number(desde),
        order: [[String(campo), String(orden)]]
    });
    res.json({ equipamientos });
});
exports.getEquipamientos = getEquipamientos;
const getEquipamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const equipamiento = yield equipamiento_1.default.findByPk(id);
    if (equipamiento) {
        res.json(equipamiento);
    }
    else {
        res.status(404).json({
            msg: `No existe un equipamiento con el id ${id}`
        });
    }
});
exports.getEquipamiento = getEquipamiento;
const postEquipamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { nombre } = req.body;
    try {
        //Guardamos en BD
        const equipamiento = yield equipamiento_1.default.create({ nombre, estado: 1 });
        res.json(equipamiento);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postEquipamiento = postEquipamiento;
const putEquipamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { nombre, estado } = req.body;
    try {
        const equipamiento = yield equipamiento_1.default.findByPk(id);
        if (!equipamiento) {
            return res.status(404).json({
                msg: `No existe un equipamiento con el id ${id}`
            });
        }
        yield equipamiento.update({ nombre, estado });
        res.json(equipamiento);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putEquipamiento = putEquipamiento;
const deleteEquipamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const equipamiento = yield equipamiento_1.default.findByPk(id);
    if (!equipamiento) {
        return res.status(404).json({
            msg: `No existe un equipamiento con el id ${id}`
        });
    }
    //await categoria.destroy();
    yield equipamiento.update({ estado: false });
    res.json({
        msg: 'Equipamiento borrado'
    });
});
exports.deleteEquipamiento = deleteEquipamiento;
//# sourceMappingURL=equipamiento.js.map