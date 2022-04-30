import { Router } from "express";
import { check } from "express-validator";
import { DeleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuario";
import validarCampos from "../middlewares/validar-campos";
import {esRoleValido, existeEmail} from "../helpers/db-validators";
import validarJWT from "../middlewares/validar-jwt";
import esAdminRol from "../middlewares/validar-rol";


const router = Router();
/**
 * Post track
 * @openapi
 *    /usuarios:
 *  get:
 *    tags:
 *    - Usuarios
 *    summary: Lista de usuarios
 *    operationId: usuarios
 *    parameters:
 *    - name: limite
 *      in: query
 *      description: Cantidad de registros que queremos devolver
 *      required: false
 *      schema:
 *        type: string
 *    - name: desde
 *      in: query
 *      description: Desde que registro queremos devolver
 *      required: false
 *      schema:
 *        type: string
 *    - name: orden
 *      in: query
 *      description: Orden descendente o ascendente para ordenar
 *      required: false
 *      schema:
 *        type: string
 *    - name: campo
 *      in: query
 *      description: Campo por el cual queremos ordenar
 *      required: false
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuarioGet'
 */
router.get('/',     getUsuarios);
/**
 * Post track
 * @openapi
 *    /usuarios/{id}:
 *  get:
 *    tags:
 *    - Usuarios
 *    summary: Obtener usuario
 *    operationId: usuario
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del usuario que queremos consultar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuarioGet'
 */
router.get('/:id',  getUsuario);
/**
 * Post track
 * @openapi
 *    /usuarios:
 *  post:
 *    tags:
 *    - Usuarios
 *    summary: Crear usuario
 *    operationId: usuarioPost
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/usuarioPost'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuarioGet'
 */
router.post('/', [
    check('nombre','El nombre debe ser mas de 4 letras').isLength({min:4}),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    check('email','El correo no es valido').isEmail(),
    check('email').custom(existeEmail),
    check('rol').custom(esRoleValido),
    validarCampos
],    postUsuario);
/**
 * Post track
 * @openapi
 *    /usuarios/{id}:
 *  put:
 *    tags:
 *    - Usuarios
 *    summary: Actualizar usuario
 *    operationId: usuarioPut
 *    parameters:
 *    - name: id
 *      in: path
 *      description: Id del usuario que queremos actualizar
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/usuarioPut'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuarioGet'
 */
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putUsuario);
/**
 * Post track
 * @openapi
 *    /usuarios/{id}:
 *  delete:
 *    tags:
 *    - Usuarios
 *    summary: Eliminar usuario
 *    operationId: usuarioDelete
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: id
 *      in: path
 *      description: Id del usuario que queremos eliminar
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuarioGet'
 */
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  DeleteUsuario);

export default router;