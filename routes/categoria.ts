import { Router } from "express";
import { check } from "express-validator";
import { deleteCategoria, getCategoria, getCategorias, postCategoria, putCategoria } from "../controllers/categoria";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import esAdminRol from "../middlewares/validar-rol";
const router = Router();
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
router.get('/',[
    validarJWT, 
    validarCampos
],     getCategorias);
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
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getCategoria);
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
    validarJWT,
    esAdminRol,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],    postCategoria);
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
router.put('/:id',[
    validarJWT,
    esAdminRol,
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putCategoria);
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
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id').isInt(),
    validarCampos
],  deleteCategoria);

export default router;