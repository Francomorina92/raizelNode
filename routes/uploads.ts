import { Router } from "express";
import { check } from "express-validator";
import { cargarArchivo, actualizarArchivoCloudinary, mostrarImagen } from "../controllers/uploads";
import { coleccionesPermitidas } from "../helpers/db-validators";
import validarCampos from "../middlewares/validar-campos";

const router = Router();
/**
 * Post track
 * @openapi
 *    /auth/login:
 *  post:
 *    tags:
 *    - Autorizacion
 *    summary: Login
 *    operationId: login
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/login'
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuarioToken'
 */
router.post('/', cargarArchivo);
router.put('/:coleccion/:id',[
    check('id','El id es obligatorio').not().isEmpty(),
    check('coleccion').custom(c=>coleccionesPermitidas(c, ['usuarios','rutinas','ejercicios'])),
    validarCampos
], actualizarArchivoCloudinary);
//actualizarArchivo);
router.get('/:coleccion/:id',[
    check('id','El id es obligatorio').not().isEmpty(),
    check('coleccion').custom(c=>coleccionesPermitidas(c, ['usuarios','rutinas','ejercicios'])),
    validarCampos
], mostrarImagen);


export default router;