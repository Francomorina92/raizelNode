"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = require("../controllers/usuario");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', usuario_1.getUsuarios);
router.get('/:id', usuario_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.existeEmail),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.default
], usuario_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    validar_campos_1.default
], usuario_1.putUsuario);
router.delete('/:id', usuario_1.DeleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map