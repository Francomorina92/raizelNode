"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const like_1 = require("../controllers/like");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', like_1.getLikes);
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], like_1.getLike);
router.post('/', [
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    (0, express_validator_1.check)('idRutina').custom(db_validators_1.esRutinaValida),
    validar_campos_1.default
], like_1.postLike);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    (0, express_validator_1.check)('idRutina').custom(db_validators_1.esRutinaValida),
    validar_campos_1.default
], like_1.putLike);
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], like_1.deleteLike);
exports.default = router;
//# sourceMappingURL=like.js.map