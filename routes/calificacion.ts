import { Router } from "express";
import { check } from "express-validator";
import { deleteCalificacion, getCalificacion, getCalificaciones, postCalificacion, putCalificacion } from "../controllers/calificacion";
import validarCampos from "../middlewares/validar-campos";
import {esPerfilValido} from "../helpers/db-validators";

const router = Router();

router.get('/',     getCalificaciones);
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getCalificacion);
router.post('/', [
    check('calificacion','La calificacion es obligatoria').not().isEmpty(),
    check('idUsuario').custom(esPerfilValido),
    check('idPerfil').custom(esPerfilValido),
    validarCampos
],    postCalificacion);
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    check('idUsuario').custom(esPerfilValido),
    check('idPerfil').custom(esPerfilValido),
    validarCampos
],  putCalificacion);
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteCalificacion);

export default router;