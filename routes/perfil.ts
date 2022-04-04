import { Router } from "express";
import { check } from "express-validator";
import { deletePerfil, getPerfil, getPerfiles, postPerfil, putPerfil } from "../controllers/perfil";
import validarCampos from "../middlewares/validar-campos";
import {esUsuarioValido} from "../helpers/db-validators";


const router = Router();

router.get('/',     getPerfiles);
router.get('/:id',[
    check('id').isInt(),
    validarCampos  
],  getPerfil);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('idUsuario','El idUsuario es obligatorio').not().isEmpty(),
    check('idUsuario').custom(esUsuarioValido),
    validarCampos
],    postPerfil);
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    check('idUsuario','El idUsuario es obligatorio').not().isEmpty(),
    check('idUsuario').custom(esUsuarioValido),
    validarCampos
],  putPerfil);
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deletePerfil);

export default router;