"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const rutina_1 = require("../controllers/rutina");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', rutina_1.getRutinas);
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], rutina_1.getRutina);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    validar_campos_1.default
], rutina_1.postRutina);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    validar_campos_1.default
], rutina_1.putRutina);
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], rutina_1.deleteRutina);
exports.default = router;
//# sourceMappingURL=rutina.js.map