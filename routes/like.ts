import { Router } from "express";
import { check } from "express-validator";
import { deleteLike, getLike, getLikes, postLike, putLike } from "../controllers/like";
import validarCampos from "../middlewares/validar-campos";
import {esPerfilValido,esRutinaValida} from "../helpers/db-validators";

const router = Router();
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
router.get('/',     getLikes);
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
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getLike);
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
router.post('/', [
    check('idPerfil').custom(esPerfilValido),
    check('idRutina').custom(esRutinaValida),
    validarCampos
],    postLike);
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
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    check('idPerfil').custom(esPerfilValido),
    check('idRutina').custom(esRutinaValida),
    validarCampos
],  putLike);
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
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteLike);

export default router;