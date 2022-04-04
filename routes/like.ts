import { Router } from "express";
import { check } from "express-validator";
import { deleteLike, getLike, getLikes, postLike, putLike } from "../controllers/like";
import validarCampos from "../middlewares/validar-campos";
import {esPerfilValido} from "../helpers/db-validators";

const router = Router();

router.get('/',     getLikes);
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getLike);
router.post('/', [
    check('idPerfil').custom(esPerfilValido),
    check('idRutina').custom(esPerfilValido),
    validarCampos
],    postLike);
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    check('idPerfil').custom(esPerfilValido),
    check('idRutina').custom(esPerfilValido),
    validarCampos
],  putLike);
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteLike);

export default router;