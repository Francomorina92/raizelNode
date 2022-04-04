import { Router } from "express";
import { check } from "express-validator";
import { deleteRutina, getRutina, getRutinas, postRutina, putRutina } from "../controllers/rutina";
import validarCampos from "../middlewares/validar-campos";
import {esPerfilValido} from "../helpers/db-validators";

const router = Router();

router.get('/',     getRutinas);
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getRutina);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('idPerfil').custom(esPerfilValido),
    validarCampos
],    postRutina);
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    check('idPerfil').custom(esPerfilValido),
    validarCampos
],  putRutina);
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteRutina);

export default router;