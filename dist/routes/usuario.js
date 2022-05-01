"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = require("../controllers/usuario");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_rol_1 = __importDefault(require("../middlewares/validar-rol"));
const router = (0, express_1.Router)();
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
router.get('/', usuario_1.getUsuarios);
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
router.get('/:id', usuario_1.getUsuario);
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
    (0, express_validator_1.check)('nombre', 'El nombre debe ser mas de 4 letras').isLength({ min: 4 }),
    (0, express_validator_1.check)('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.existeEmail),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.default
], usuario_1.postUsuario);
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
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    validar_campos_1.default
], usuario_1.putUsuario);
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
router.delete('/:id', [
    validar_jwt_1.default,
    validar_rol_1.default,
    (0, express_validator_1.check)('id', 'El id tiene que ser numerico').isInt(),
    validar_campos_1.default
], usuario_1.DeleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map