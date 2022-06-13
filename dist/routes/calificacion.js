"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const calificacion_1 = require("../controllers/calificacion");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 *    /calificaciones:
 *  get:
 *    tags:
 *    - Calificaciones
 *    summary: Lista de calificaciones
 *    operationId: calificaciones
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
 *      description: id del perfil que queremos filtrar las calificaciones
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/calificacionGet'
 */
router.get('/', calificacion_1.getCalificaciones);
/**
 * Post track
 * @openapi
 *    /calificaciones:
 *  get:
 *    tags:
 *    - Calificaciones
 *    summary: Lista de calificaciones
 *    operationId: calificaciones
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
 *      description: id del perfil que queremos filtrar las calificaciones
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/calificacionGet'
 */
router.get('/todos', [
    validar_jwt_1.default,
    validar_campos_1.default
], calificacion_1.getTotalCalificaciones);
/**
 * Post track
 * @openapi
 *    /calificaciones/{id}:
 *  get:
 *    tags:
 *    - Calificaciones
 *    summary: Obtener calificacion
 *    operationId: calificacion
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id de la calificacion que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/calificacionGet'
 */
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], calificacion_1.getCalificacion);
/**
 * Post track
 * @openapi
 *    /calificaciones:
 *  post:
 *    tags:
 *    - Calificaciones
 *    summary: Crear calificacion
 *    operationId: calificacionPost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/calificacionPost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/calificacionGet'
 */
router.post('/', [
    (0, express_validator_1.check)('calificacion', 'La calificacion es obligatoria').not().isEmpty(),
    validar_campos_1.default
], calificacion_1.postCalificacion);
/**
 * Post track
 * @openapi
 *    /calificaciones/{id}:
 *  put:
 *    tags:
 *    - Calificaciones
 *    summary: Actualizar calificacion
 *    operationId: calificacionPut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id de la calificacion que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/calificacionPut'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/calificacionGet'
 */
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    validar_campos_1.default
], calificacion_1.putCalificacion);
/**
 * Post track
 * @openapi
 *    /calificaciones/{id}:
 *  delete:
 *    tags:
 *    - Calificaciones
 *    summary: Eliminar calificacion
 *    operationId: calificacionDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id de la calificacion que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/calificacionGet'
 */
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], calificacion_1.deleteCalificacion);
exports.default = router;
//# sourceMappingURL=calificacion.js.map