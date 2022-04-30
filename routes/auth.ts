import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth";
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
router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

export default router;