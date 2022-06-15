"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const uploads_1 = require("../controllers/uploads");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 *    /auth/login:
 *  post:
 *    tags:
 *    - Autorizacion
 *    summary: Login
 *    operationId: login
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/login'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuarioToken'
 */
router.post('/', uploads_1.cargarArchivo);
router.put('/:coleccion/:id', [
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('coleccion').custom(c => (0, db_validators_1.coleccionesPermitidas)(c, ['usuarios', 'rutinas', 'ejercicios'])),
    validar_campos_1.default
], uploads_1.actualizarArchivoCloudinary);
//actualizarArchivo);
router.get('/:coleccion/:id', [
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('coleccion').custom(c => (0, db_validators_1.coleccionesPermitidas)(c, ['usuarios', 'rutinas', 'ejercicios'])),
    validar_campos_1.default
], uploads_1.mostrarImagen);
exports.default = router;
//# sourceMappingURL=uploads.js.map