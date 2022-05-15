"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ejercicio_1 = require("../controllers/ejercicio");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', ejercicio_1.getEjercicios);
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], ejercicio_1.getEjercicio);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre tiene que tener maximo 100 caracteres').isLength({ max: 100 }),
    (0, express_validator_1.check)('preparacion', 'La preparacion tiene que tener maximo 500 caracteres').isLength({ max: 500 }),
    (0, express_validator_1.check)('ejecucion', 'La ejecucion tiene que tener maximo 500 caracteres').isLength({ max: 500 }),
    (0, express_validator_1.check)('detalles', 'Los detalles tienen que tener maximo 500 caracteres').isLength({ max: 500 }),
    (0, express_validator_1.check)('idCategoria').custom(db_validators_1.esCategoriaValida),
    (0, express_validator_1.check)('idEquipamiento').custom(db_validators_1.esEquipamientoValido),
    (0, express_validator_1.check)('idMusculoPrincipal').custom(db_validators_1.esMusculoValido),
    (0, express_validator_1.check)('idMusculoSecundario').custom(db_validators_1.esMusculoValido),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    validar_campos_1.default
], ejercicio_1.postEjercicio);
router.put('/:id', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre tiene que tener maximo 100 caracteres').isLength({ max: 100 }),
    (0, express_validator_1.check)('color', 'El color tiene que tener maximo 13 caracteres').isLength({ max: 13 }),
    (0, express_validator_1.check)('preparacion', 'La preparacion tiene que tener maximo 500 caracteres').isLength({ max: 500 }),
    (0, express_validator_1.check)('ejecucion', 'La ejecucion tiene que tener maximo 500 caracteres').isLength({ max: 500 }),
    (0, express_validator_1.check)('ejecucion', 'La ejecucion tiene que tener maximo 500 caracteres').isLength({ max: 500 }),
    (0, express_validator_1.check)('detalles', 'Los detalles tienen que tener maximo 500 caracteres').isLength({ max: 500 }),
    (0, express_validator_1.check)('idCategoria').custom(db_validators_1.esCategoriaValida),
    (0, express_validator_1.check)('idEquipamiento').custom(db_validators_1.esEquipamientoValido),
    (0, express_validator_1.check)('idMusculoPrincipal').custom(db_validators_1.esMusculoValido),
    (0, express_validator_1.check)('idMusculoSecundario').custom(db_validators_1.esMusculoValido),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    validar_campos_1.default
], ejercicio_1.putEjercicio);
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], ejercicio_1.deleteEjercicio);
exports.default = router;
//# sourceMappingURL=ejercicio.js.map