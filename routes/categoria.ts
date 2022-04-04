import { Router } from "express";
import { check } from "express-validator";
import { deleteCategoria, getCategoria, getCategorias, postCategoria, putCategoria } from "../controllers/categoria";
import validarCampos from "../middlewares/validar-campos";


const router = Router();

router.get('/',     getCategorias);
router.get('/:id',[
    check('id').isInt(),
    validarCampos
],  getCategoria);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],    postCategoria);
router.put('/:id',[
    check('id','El id tiene que ser numerico').isInt(),
    validarCampos
],  putCategoria);
router.delete('/:id',[
    check('id').isInt(),
    validarCampos
],  deleteCategoria);

export default router;