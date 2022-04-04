"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const calificacion_1 = require("../controllers/calificacion");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', calificacion_1.getCalificaciones);
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], calificacion_1.getCalificacion);
router.post('/', [
    (0, express_validator_1.check)('calificacion', 'La calificacion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('idUsuario').custom(db_validators_1.esPerfilValido),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    validar_campos_1.default
], calificacion_1.postCalificacion);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    (0, express_validator_1.check)('idUsuario').custom(db_validators_1.esPerfilValido),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    validar_campos_1.default
], calificacion_1.putCalificacion);
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], calificacion_1.deleteCalificacion);
exports.default = router;
//# sourceMappingURL=calificacion.js.map