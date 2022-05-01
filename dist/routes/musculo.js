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
/**
 * Post track
 * @openapi
 *    /musculos:
 *  get:
 *    tags:
 *    - Musculos
 *    summary: Lista de musculos
 *    operationId: musculos
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
 *              $ref: '#/components/schemas/musculoGet'
 */
router.get('/', musculo_1.getMusculos);
/**
 * Post track
 * @openapi
 *    /musculos/{id}:
 *  get:
 *    tags:
 *    - Musculos
 *    summary: Obtener musculo
 *    operationId: musculo
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del musculo que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/musculoGet'
 */
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], musculo_1.getMusculo);
/**
 * Post track
 * @openapi
 *    /musculos:
 *  post:
 *    tags:
 *    - Musculos
 *    summary: Crear musculo
 *    operationId: musculoPost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/musculoPost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/musculoGet'
 */
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.default
], musculo_1.postMusculo);
/**
 * Post track
 * @openapi
 *    /musculos/{id}:
 *  put:
 *    tags:
 *    - Musculos
 *    summary: Actualizar musculo
 *    operationId: musculoPut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del musculo que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/musculoPut'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/musculoGet'
 */
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    validar_campos_1.default
], musculo_1.putMusculo);
/**
 * Post track
 * @openapi
 *    /musculos/{id}:
 *  delete:
 *    tags:
 *    - Musculos
 *    summary: Eliminar musculo
 *    operationId: musculoDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id del musculo que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/musculoGet'
 */
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], musculo_1.deleteMusculo);
exports.default = router;
//# sourceMappingURL=musculo.js.map