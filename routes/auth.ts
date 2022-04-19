import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth";
import validarCampos from "../middlewares/validar-campos";

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

export default router;