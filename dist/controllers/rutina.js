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
exports.deletedetalle = exports.getDetalles = exports.getDetalle = exports.putDetalleRutina = exports.postDetalleRutina = exports.deleteRutina = exports.putRutina = exports.postRutina = exports.getRutina = exports.getRutinas = void 0;
const rutina_1 = __importDefault(require("../models/rutina"));
const { QueryTypes } = require('sequelize');
const conecction_1 = __importDefault(require("../db/conecction"));
const perfil_1 = __importDefault(require("../models/perfil"));
const detalleRutina_1 = __importDefault(require("../models/detalleRutina"));
const detalleR_1 = __importDefault(require("../models/detalleR"));
const getRutinas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 50, desde = 0, orden = 'asc', campo = 'nombre', perfil = 0, favorita = false } = req.query;
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    console.log(perfil);
    console.log(favorita);
    const { id } = req.user;
    const per = yield perfil_1.default.findOne({
        where: {
            idUsuario: id
        }
    });
    const idP = per.id;
    let rutinas = null;
    if (perfil != 0) {
        if (favorita) {
            console.log('favorita');
            const rows = yield conecction_1.default.query('call getRutinasFavoritas(:perfil)', {
                replacements: { perfil },
                model: rutina_1.default,
                type: QueryTypes.SELECT
            });
            rutinas = rows[0];
        }
        else {
            console.log('No favorita');
            const rows = yield conecction_1.default.query('call getRutinas(:perfil)', {
                replacements: { perfil },
                model: rutina_1.default,
                type: QueryTypes.SELECT
            });
            rutinas = rows[0];
        }
    }
    else {
        const rows = yield conecction_1.default.query('call getRutinasTodas( :orden, :campo)', {
            replacements: { orden, campo },
            model: rutina_1.default,
            type: QueryTypes.SELECT
        });
        rutinas = rows[0];
    }
    console.log('rutinas ' + rutinas);
    res.json(rutinas);
});
exports.getRutinas = getRutinas;
const getRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let rutina = {};
    const rows = yield conecction_1.default.query('call getRutina(:id)', {
        replacements: { id },
        model: rutina_1.default,
        type: QueryTypes.SELECT
    });
    rutina = rows[0];
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
    const { nombre } = req.body;
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    const { id } = req.user;
    const perfil = yield perfil_1.default.findOne({
        where: {
            idUsuario: id
        }
    });
    try {
        //Guardamos en BD
        const rutina = yield rutina_1.default.create({ nombre, idPerfil: perfil.id, estado: 1 });
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
const postDetalleRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos los datos por el post
    const { idRutina, idEjercicio, tipoSerie, cantidadSerie, descanso, repeticionesUno, repeticionesDos, repeticionesTres, repeticionesCuatro, repeticionesCinco, cargaUno, cargaDos, cargaTres, cargaCuatro, cargaCinco, unidad, observaciones } = req.body;
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    const { id } = req.user;
    const perfil = yield perfil_1.default.findOne({
        where: {
            idUsuario: id
        }
    });
    try {
        //Guardamos en BD
        const detalle = yield detalleRutina_1.default.create({
            idRutina,
            idEjercicio,
            tipoSerie,
            cantidadSerie,
            descanso,
            repeticionesUno,
            repeticionesDos,
            repeticionesTres,
            repeticionesCuatro,
            repeticionesCinco,
            cargaUno,
            cargaDos,
            cargaTres,
            cargaCuatro,
            cargaCinco,
            unidad,
            observaciones,
            estado: 1
        });
        res.json(detalle);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postDetalleRutina = postDetalleRutina;
const putDetalleRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Obtenemos los datos por el put
    const { idRutina, idEjercicio, tipoSerie, cantidadSerie, descanso, repeticionesUno, repeticionesDos, repeticionesTres, repeticionesCuatro, repeticionesCinco, cargaUno, cargaDos, cargaTres, cargaCuatro, cargaCinco, unidad, observaciones } = req.body;
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    try {
        let detalle = {};
        const rows = yield conecction_1.default.query('call getRutina(:id)', {
            replacements: { id },
            model: detalleRutina_1.default,
            type: QueryTypes.SELECT
        });
        detalle = rows[0];
        if (!detalle) {
            return res.status(404).json({
                msg: `No existe un detalle con el id ${id}`
            });
        }
        yield detalle[0].update({ idRutina, idEjercicio, tipoSerie, cantidadSerie, descanso, repeticionesUno, repeticionesDos, repeticionesTres, repeticionesCuatro, repeticionesCinco, cargaUno, cargaDos, cargaTres, cargaCuatro, cargaCinco, unidad, observaciones });
        res.json(detalle);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putDetalleRutina = putDetalleRutina;
const getDetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalle = yield detalleRutina_1.default.findByPk(id);
    if (detalle) {
        res.json(detalle);
    }
    else {
        res.status(404).json({
            msg: `No existe una detalle con el id ${id}`
        });
    }
});
exports.getDetalle = getDetalle;
const getDetalles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 50, desde = 0, orden = 'asc', campo = 'updatedAt', rutina = 0 } = req.query;
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el token primero'
        });
    }
    let detalles = null;
    const rows = yield conecction_1.default.query('call getDetalles(:rutina, :limite, :desde, :orden, :campo)', {
        replacements: { rutina, limite, desde, orden, campo },
        model: detalleRutina_1.default,
        type: QueryTypes.SELECT
    });
    detalles = rows[0];
    res.json(detalles);
});
exports.getDetalles = getDetalles;
const deletedetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalle = yield detalleR_1.default.findByPk(id);
    if (!detalle) {
        return res.status(404).json({
            msg: `No existe una detalle con el id ${id}`
        });
    }
    yield detalle.destroy();
    res.json({
        msg: true
    });
});
exports.deletedetalle = deletedetalle;
//# sourceMappingURL=rutina.js.map