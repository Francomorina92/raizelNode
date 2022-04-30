"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categoria_1 = require("../controllers/categoria");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 *    /categorias:
 *  get:
 *    tags:
 *    - Categorias
 *    summary: Lista de categorias
 *    operationId: categorias
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
 *              $ref: '#/components/schemas/categoriaGet'
 */
router.get('/', categoria_1.getCategorias);
/**
 * Post track
 * @openapi
 *    /categorias/{id}:
 *  get:
 *    tags:
 *    - Categorias
 *    summary: Obtener categoria
 *    operationId: categoria
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id de la categoria que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/categoriaGet'
 */
router.get('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], categoria_1.getCategoria);
/**
 * Post track
 * @openapi
 *    /categorias:
 *  post:
 *    tags:
 *    - Categorias
 *    summary: Crear categoria
 *    operationId: categoriaPost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/categoriaPost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/categoriaGet'
 */
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.default
], categoria_1.postCategoria);
/**
 * Post track
 * @openapi
 *    /categorias/{id}:
 *  put:
 *    tags:
 *    - Categorias
 *    summary: Actualizar categoria
 *    operationId: categoriaPut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id de la categoria que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/categoriaPut'
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
], categoria_1.putCategoria);
/**
 * Post track
 * @openapi
 *    /categorias/{id}:
 *  delete:
 *    tags:
 *    - Categorias
 *    summary: Eliminar categoria
 *    operationId: categoriaDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id de la categoria que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/categoriaGet'
 */
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], categoria_1.deleteCategoria);
exports.default = router;
//# sourceMappingURL=categoria.js.map