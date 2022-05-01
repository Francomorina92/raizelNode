import { Router } from "express";
import { check } from "express-validator";
import { deleteMusculo, getMusculo, getMusculos, postMusculo, putMusculo } from "../controllers/musculo";
import validarCampos from "../middlewares/validar-campos";


const router = Router();
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
router.get('/',     getMusculos);
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
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getMusculo);
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
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],    postMusculo);
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
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putMusculo);
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
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteMusculo);

export default router;