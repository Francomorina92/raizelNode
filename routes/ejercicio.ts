import { Router } from "express";
import { check } from "express-validator";
import { deleteEjercicio, getEjercicio, getEjercicios, postEjercicio, putEjercicio } from "../controllers/ejercicio";
import validarCampos from "../middlewares/validar-campos";
import { esPerfilValido, esCategoriaValida, esEquipamientoValido, esMusculoValido } from '../helpers/db-validators';

const router = Router();

router.get('/',     getEjercicios);
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getEjercicio);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','El nombre tiene que tener maximo 100 caracteres').isLength({ max:100 }),
    check('color','El color tiene que tener maximo 13 caracteres').isLength({ max:13 }),
    check('preparacion','La preparacion tiene que tener maximo 500 caracteres').isLength({ max:500 }),
    check('ejecucion','La ejecucion tiene que tener maximo 500 caracteres').isLength({ max:500 }),
    check('ejecucion','La ejecucion tiene que tener maximo 500 caracteres').isLength({ max:500 }),
    check('detalles','Los detalles tienen que tener maximo 500 caracteres').isLength({ max:500 }),
    check('idCategoria').custom(esCategoriaValida),
    check('idEquipamiento').custom(esEquipamientoValido),
    check('idMusculoPrincipal').custom(esMusculoValido),
    check('idMusculoSecundario').custom(esMusculoValido),
    check('idPerfil').custom(esPerfilValido),
    validarCampos
],    postEjercicio);
router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','El nombre tiene que tener maximo 100 caracteres').isLength({ max:100 }),
    check('color','El color tiene que tener maximo 13 caracteres').isLength({ max:13 }),
    check('preparacion','La preparacion tiene que tener maximo 500 caracteres').isLength({ max:500 }),
    check('ejecucion','La ejecucion tiene que tener maximo 500 caracteres').isLength({ max:500 }),
    check('ejecucion','La ejecucion tiene que tener maximo 500 caracteres').isLength({ max:500 }),
    check('detalles','Los detalles tienen que tener maximo 500 caracteres').isLength({ max:500 }),
    check('idCategoria').custom(esCategoriaValida),
    check('idEquipamiento').custom(esEquipamientoValido),
    check('idMusculoPrincipal').custom(esMusculoValido),
    check('idMusculoSecundario').custom(esMusculoValido),
    check('idPerfil').custom(esPerfilValido),
    validarCampos
],  putEjercicio);
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteEjercicio);

export default router;