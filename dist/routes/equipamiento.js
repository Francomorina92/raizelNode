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
/**
 * Post track
 * @openapi
 *    /equipamientos:
 *  get:
 *    tags:
 *    - Equipamientos
 *    summary: Lista de equipamientos
 *    operationId: equipamientos
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
 *              $ref: '#/components/schemas/equipamientoGet'
 */
router.get('/', equipamiento_1.getEquipamientos);
/**
 * Post track
 * @openapi
 *    /equipamientos/{id}:
 *  get:
 *    tags:
 *    - Equipamientos
 *    summary: Obtener equipamiento
 *    operationId: equipamiento
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del equipamiento que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/equipamientoGet'
 */
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], equipamiento_1.getEquipamiento);
/**
 * Post track
 * @openapi
 *    /equipamientos:
 *  post:
 *    tags:
 *    - Equipamientos
 *    summary: Crear equipamiento
 *    operationId: equipamientoPost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/equipamientoPost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/equipamientoGet'
 */
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.default
], equipamiento_1.postEquipamiento);
/**
 * Post track
 * @openapi
 *    /equipamientos/{id}:
 *  put:
 *    tags:
 *    - Equipamientos
 *    summary: Actualizar equipamiento
 *    operationId: equipamientoPut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del equipamiento que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/equipamientoPut'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/categoriaGet'
 */
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    validar_campos_1.default
], equipamiento_1.putEquipamiento);
/**
 * Post track
 * @openapi
 *    /equipamientos/{id}:
 *  delete:
 *    tags:
 *    - Equipamientos
 *    summary: Eliminar equipamiento
 *    operationId: equipamientoDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id del equipamiento que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/equipamientoGet'
 */
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], equipamiento_1.deleteEquipamiento);
exports.default = router;
//# sourceMappingURL=equipamiento.js.map