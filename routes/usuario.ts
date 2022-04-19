import { Router } from "express";
import { check } from "express-validator";
import { DeleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuario";
import validarCampos from "../middlewares/validar-campos";
import {esRoleValido, existeEmail} from "../helpers/db-validators";


const router = Router();

router.get('/',     getUsuarios);
router.get('/:id',  getUsuario);
router.post('/', [
    check('nombre','El nombre debe ser mas de 4 letras').isLength({min:4}),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    check('email','El correo no es valido').isEmail(),
    check('email').custom(existeEmail),
    check('rol').custom(esRoleValido),
    validarCampos
],    postUsuario);
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putUsuario);
router.delete('/:id',  DeleteUsuario);

export default router;