import { Request, Response } from "express";
import Categoria from '../models/categoria';
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";

export const getCategorias= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 0,orden = 'asc',campo = 'nombre', filtro = ''}= req.query;
    let categorias=null; 
    
    const rows = await db.query('call getCategorias(:filtro, :limite, :desde, :orden, :campo)', { 
        replacements: { filtro, limite, desde, orden, campo }, 
        model: Categoria,
        type: QueryTypes.SELECT
    });
    categorias = rows[0];
    
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
