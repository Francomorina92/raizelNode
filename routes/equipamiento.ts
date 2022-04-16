import { Router } from "express";
import { check } from "express-validator";
import { deleteEquipamiento, getEquipamiento, getEquipamientos, postEquipamiento, putEquipamiento } from "../controllers/equipamiento";
import validarCampos from "../middlewares/validar-campos";


const router = Router();

router.get('/:limite/:desde',     getEquipamientos);
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getEquipamiento);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],    postEquipamiento);
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putEquipamiento);
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteEquipamiento);

export default router;