"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const musculo_1 = require("../controllers/musculo");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
router.get('/', musculo_1.getMusculos);
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], musculo_1.getMusculo);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.default
], musculo_1.postMusculo);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    validar_campos_1.default
], musculo_1.putMusculo);
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], musculo_1.deleteMusculo);
exports.default = router;
//# sourceMappingURL=musculo.js.map