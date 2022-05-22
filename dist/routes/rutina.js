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
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 *    /rutinas:
 *  get:
 *    tags:
 *    - Rutinas
 *    summary: Lista de rutinas
 *    operationId: rutinas
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
 *    - name: perfil
 *      in: query
 *      description: id del perfil que queremos filtrar las rutinas
 *      required: false
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/rutinaGet'
 */
router.get('/', [
    validar_jwt_1.default,
    validar_campos_1.default
], rutina_1.getRutinas);
/**
 * Post track
 * @openapi
 *    /rutinas/{id}:
 *  get:
 *    tags:
 *    - Rutinas
 *    summary: Obtener rutina
 *    operationId: rutina
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id de la rutina que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/rutinaGet'
 */
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], rutina_1.getRutina);
/**
 * Post track
 * @openapi
 *    /rutinas:
 *  post:
 *    tags:
 *    - Rutinas
 *    summary: Crear rutina
 *    operationId: rutinaPost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/rutinaPost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/rutinaGet'
 */
router.post('/', [
    validar_jwt_1.default,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.default
], rutina_1.postRutina);
/**
 * Post track
 * @openapi
 *    /rutinas/{id}:
 *  put:
 *    tags:
 *    - Rutinas
 *    summary: Actualizar rutina
 *    operationId: rutinaPut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id de la rutina que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/rutinaPut'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/rutinaGet'
 */
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    validar_campos_1.default
], rutina_1.putRutina);
/**
 * Post track
 * @openapi
 *    /rutinas/{id}:
 *  delete:
 *    tags:
 *    - Rutinas
 *    summary: Eliminar rutina
 *    operationId: rutinaDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id de la rutina que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/rutinaGet'
 */
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], rutina_1.deleteRutina);
exports.default = router;
//# sourceMappingURL=rutina.js.map