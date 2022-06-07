"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const like_1 = require("../controllers/like");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 *    /likes:
 *  get:
 *    tags:
 *    - Likes
 *    summary: Lista de likes
 *    operationId: likes
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
 *    - name: rutina
 *      in: query
 *      description: id de la rutina que queremos filtrar las likes
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/likeGet'
 */
router.get('/', like_1.getLikes);
/**
 * Post track
 * @openapi
 *    /likes/{id}:
 *  get:
 *    tags:
 *    - Likes
 *    summary: Obtener like
 *    operationId: like
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del like que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/likeGet'
 */
router.post('/megusta', like_1.getLike);
/**
 * Post track
 * @openapi
 *    /likes:
 *  post:
 *    tags:
 *    - Likes
 *    summary: Crear like
 *    operationId: likePost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/likePost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/likeGet'
 */
router.post('/', like_1.postLike);
/**
 * Post track
 * @openapi
 *    /likes/{id}:
 *  put:
 *    tags:
 *    - Likes
 *    summary: Actualizar like
 *    operationId: likePut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del like que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/likePut'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/likeGet'
 */
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    (0, express_validator_1.check)('idPerfil').custom(db_validators_1.esPerfilValido),
    (0, express_validator_1.check)('idRutina').custom(db_validators_1.esRutinaValida),
    validar_campos_1.default
], like_1.putLike);
/**
 * Post track
 * @openapi
 *    /likes/{id}:
 *  delete:
 *    tags:
 *    - Likes
 *    summary: Eliminar like
 *    operationId: likeDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id del like que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/likeGet'
 */
router.delete('/:id', [
    (0, express_validator_1.check)('id').isInt(),
    validar_campos_1.default
], like_1.deleteLike);
exports.default = router;
//# sourceMappingURL=like.js.map