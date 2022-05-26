import { Router } from "express";
import { check } from "express-validator";
import { login, tokenValido, confirmacionEmail, recuperar, cambiarPassword } from "../controllers/auth";
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
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);
router.post('/tokenValido', tokenValido);
router.post('/confirmacionEmail', confirmacionEmail);
router.post('/recuperar',[
    check('email','El email es obligatorio').isEmail(),
    validarCampos
], recuperar);
router.post('/cambiarPassword',[
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], cambiarPassword);

export default router;