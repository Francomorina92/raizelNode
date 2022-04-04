import { Router } from "express";
import { check } from "express-validator";
import { deleteMusculo, getMusculo, getMusculos, postMusculo, putMusculo } from "../controllers/musculo";
import validarCampos from "../middlewares/validar-campos";


const router = Router();

router.get('/',     getMusculos);
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getMusculo);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],    postMusculo);
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putMusculo);
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteMusculo);

export default router;