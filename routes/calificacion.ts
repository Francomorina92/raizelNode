import { Router } from "express";
import { check } from "express-validator";
import { deleteCalificacion, getCalificacion, getCalificaciones, postCalificacion, putCalificacion } from "../controllers/calificacion";
import validarCampos from "../middlewares/validar-campos";
import {esPerfilValido} from "../helpers/db-validators";

const router = Router();
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
router.get('/',     getCalificaciones);
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
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getCalificacion);
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
    check('calificacion','La calificacion es obligatoria').not().isEmpty(),
    validarCampos
],    postCalificacion);
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
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putCalificacion);
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
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteCalificacion);

export default router;