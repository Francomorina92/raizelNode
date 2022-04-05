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
exports.esRutinaValida = exports.esPerfilValido = exports.esUsuarioValido = exports.existeEmail = exports.esRoleValido = void 0;
const rol_1 = __importDefault(require("../models/rol"));
const usuario_1 = __importDefault(require("../models/usuario"));
const perfil_1 = __importDefault(require("../models/perfil"));
const rutina_1 = __importDefault(require("../models/rutina"));
const esRoleValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_1.default.findOne({
        where: {
            nombre: rol
        }
    });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
});
exports.esRoleValido = esRoleValido;
//Verificamos si el mail existe
const existeEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield usuario_1.default.findOne({
        where: {
            email: email
        }
    });
    if (existe) {
        throw new Error(`Ya existe un usuario con el email  ${email}`);
    }
});
exports.existeEmail = existeEmail;
const esUsuarioValido = (idUsuario = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield usuario_1.default.findByPk(idUsuario);
    if (!existeUsuario) {
        throw new Error(`El usuario ${idUsuario} no esta registrado en la BD`);
    }
});
exports.esUsuarioValido = esUsuarioValido;
const esPerfilValido = (idPerfil = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existePerfil = yield perfil_1.default.findByPk(idPerfil);
    if (!existePerfil) {
        throw new Error(`El perfil ${idPerfil} no esta registrado en la BD`);
    }
});
exports.esPerfilValido = esPerfilValido;
const esRutinaValida = (idRutina = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRutina = yield rutina_1.default.findByPk(idRutina);
    if (!existeRutina) {
        throw new Error(`La rutina ${idRutina} no esta registrada en la BD`);
    }
});
exports.esRutinaValida = esRutinaValida;
//# sourceMappingURL=db-validators.js.map