"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const equipamiento_1 = require("../controllers/equipamiento");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
router.get('/:limite/:desde', equipamiento_1.getEquipamientos);
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], equipamiento_1.getEquipamiento);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.default
], equipamiento_1.postEquipamiento);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    validar_campos_1.default
], equipamiento_1.putEquipamiento);
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], equipamiento_1.deleteEquipamiento);
exports.default = router;
//# sourceMappingURL=equipamiento.js.map