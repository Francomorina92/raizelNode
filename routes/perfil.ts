import { Router } from "express";
import { check } from "express-validator";
import { deletePerfil, getPerfil, getPerfiles, postPerfil, putPerfil } from "../controllers/perfil";
import validarCampos from "../middlewares/validar-campos";
import {esUsuarioValido} from "../helpers/db-validators";


const router = Router();
/**
 * Post track
 * @openapi
 *    /perfiles:
 *  get:
 *    tags:
 *    - Perfiles
 *    summary: Lista de perfiles
 *    operationId: perfiles
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
 *              $ref: '#/components/schemas/perfilGet'
 */
router.get('/',     getPerfiles);
/**
 * Post track
 * @openapi
 *    /perfiles/{id}:
 *  get:
 *    tags:
 *    - Perfiles
 *    summary: Obtener perfil
 *    operationId: perfil
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del perfil que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.get('/:id',[
    check('id').isInt(),
    validarCampos  
],  getPerfil);
/**
 * Post track
 * @openapi
 *    /perfiles:
 *  post:
 *    tags:
 *    - Perfiles
 *    summary: Crear perfil
 *    operationId: perfilPost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/perfilPost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('idUsuario','El idUsuario es obligatorio').not().isEmpty(),
    check('idUsuario').custom(esUsuarioValido),
    validarCampos
],    postPerfil);
/**
 * Post track
 * @openapi
 *    /perfiles/{id}:
 *  put:
 *    tags:
 *    - Perfiles
 *    summary: Actualizar perfil
 *    operationId: perfilPut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del perfil que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/perfilPut'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    check('idUsuario','El idUsuario es obligatorio').not().isEmpty(),
    check('idUsuario').custom(esUsuarioValido),
    validarCampos
],  putPerfil);
/**
 * Post track
 * @openapi
 *    /perfiles/{id}:
 *  delete:
 *    tags:
 *    - Perfiles
 *    summary: Eliminar perfil
 *    operationId: perfilDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id del perfil que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/perfilGet'
 */
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deletePerfil);

export default router;