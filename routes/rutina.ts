import { Router } from "express";
import { check } from "express-validator";
import { deleteRutina, getRutina, getRutinas, postRutina, putRutina, postDetalleRutina, getDetalles, putDetalleRutina, deletedetalle } from "../controllers/rutina";
import validarCampos from "../middlewares/validar-campos";
import {esPerfilValido} from "../helpers/db-validators";
import validarJWT from "../middlewares/validar-jwt";
const router = Router();
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
 router.get('/detalles', [
    validarJWT,
    validarCampos
],    getDetalles);
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
    validarJWT,
    validarCampos
],    getRutinas);
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
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getRutina);
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
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],    postRutina);
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
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    check('idPerfil').custom(esPerfilValido),
    validarCampos
],  putRutina);
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
router.delete('/detalle/:id',[
    check('id').isInt(),
    validarCampos
],  deletedetalle);
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
/* router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteRutina); */
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
 router.post('/detalle', [
    validarJWT,
    check('idEjercicio','El ejercicio es obligatorio').not().isEmpty(),
    check('idRutina','La rutina es obligatoria').not().isEmpty(),
    check('tipoSerie','El tipo de serie es obligatorio').not().isEmpty(),
    validarCampos
],    postDetalleRutina);
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
 router.put('/detalles/:id',[
    validarJWT,
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putDetalleRutina);

export default router;