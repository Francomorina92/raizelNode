"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const perfil_1 = require("../controllers/perfil");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', perfil_1.getPerfiles);
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], perfil_1.getPerfil);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idUsuario', 'El idUsuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idUsuario').custom(db_validators_1.esUsuarioValido),
    validar_campos_1.default
], perfil_1.postPerfil);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    (0, express_validator_1.check)('idUsuario', 'El idUsuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idUsuario').custom(db_validators_1.esUsuarioValido),
    validar_campos_1.default
], perfil_1.putPerfil);
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], perfil_1.deletePerfil);
exports.default = router;
//# sourceMappingURL=perfil.js.map