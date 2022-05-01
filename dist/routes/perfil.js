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
/**
 * Post track
 * @openapi
 *    /perfiles:
 *  get:
 *    tags:
 *    - Perfiles
 *    summary: Lista de perfiles
 *    operationId: perfiles
 *    parameters:
 *    - name: limite
 *      in: query
 *      description: Cantidad de registros que queremos devolver
 *      required: false
 *      schema:
 *        type: string
 *        default: 5
 *    - name: desde
 *      in: query
 *      description: Desde que registro queremos devolver
 *      required: false
 *      schema:
 *        type: string
 *        default: 0
 *    - name: orden
 *      in: query
 *      description: Orden descendente o ascendente para ordenar
 *      required: false
 *      schema:
 *        type: string
 *        default: asc
 *    - name: campo
 *      in: query
 *      description: Campo por el cual queremos ordenar
 *      required: false
 *      schema:
 *        type: string
 *        default: id
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.get('/', perfil_1.getPerfiles);
/**
 * Post track
 * @openapi
 *    /perfiles/{id}:
 *  get:
 *    tags:
 *    - Perfiles
 *    summary: Obtener perfil
 *    operationId: perfil
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del perfil que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], perfil_1.getPerfil);
/**
 * Post track
 * @openapi
 *    /perfiles:
 *  post:
 *    tags:
 *    - Perfiles
 *    summary: Crear perfil
 *    operationId: perfilPost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/perfilPost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idUsuario', 'El idUsuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idUsuario').custom(db_validators_1.esUsuarioValido),
    validar_campos_1.default
], perfil_1.postPerfil);
/**
 * Post track
 * @openapi
 *    /perfiles/{id}:
 *  put:
 *    tags:
 *    - Perfiles
 *    summary: Actualizar perfil
 *    operationId: perfilPut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del perfil que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/perfilPut'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    (0, express_validator_1.check)('idUsuario', 'El idUsuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idUsuario').custom(db_validators_1.esUsuarioValido),
    validar_campos_1.default
], perfil_1.putPerfil);
/**
 * Post track
 * @openapi
 *    /perfiles/{id}:
 *  delete:
 *    tags:
 *    - Perfiles
 *    summary: Eliminar perfil
 *    operationId: perfilDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id del perfil que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], perfil_1.deletePerfil);
exports.default = router;
//# sourceMappingURL=perfil.js.map