import { Request, Response } from "express";
import Categoria from '../models/categoria';


export const getCategorias= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 0,orden = 'asc',campo = 'nombre'}= req.query; 
    
    const categorias= await Categoria.findAndCountAll(
        {
            limit:Number(limite),
            offset:Number(desde),
            order: [[String(campo),String(orden)]]
        }
    );
    res.json({categorias});
}
export const getCategoria= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const categoria = await Categoria.findByPk(id);
    if (categoria) {
        res.json(categoria);
    }else{
        res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        });
    }
}
export const postCategoria= async (req:Request ,res:Response)=>{
    //Obtenemos los datos por el post
    const {nombre, estado=1}=req.body;
    
    try {
        //Guardamos en BD
        const categoria = await Categoria.create({nombre,estado});
        res.json(categoria);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putCategoria= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {nombre,estado}=req.body;
    
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({
                msg: `No existe una categoria con el id ${id}`
            })
        }
        await categoria.update({nombre, estado});
        res.json(categoria);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deleteCategoria=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
        return res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        })
    }
    //await categoria.destroy();
    await categoria.update({estado:false});
    res.json({
        msg: 'Categoria borrada'
    })
}
