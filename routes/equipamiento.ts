import { Router } from "express";
import { check } from "express-validator";
import { deleteEquipamiento, getEquipamiento, getEquipamientos, postEquipamiento, putEquipamiento } from "../controllers/equipamiento";
import validarCampos from "../middlewares/validar-campos";


const router = Router();
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
router.get('/',     getEquipamientos);
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
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getEquipamiento);
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
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],    postEquipamiento);
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
 *              $ref: '#/components/schemas/musculoGet'
 */
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putEquipamiento);
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
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteEquipamiento);

export default router;