import { Request, Response } from "express";
import Equipamiento from '../models/equipamiento';
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";

export const getEquipamientos= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 0,orden = 'asc',campo = 'nombre', filtro = ''}= req.query; 
    let equipamientos=null; 
    
    const rows = await db.query('call getEquipamientos(:filtro, :limite, :desde, :orden, :campo)', { 
        replacements: { filtro, limite, desde, orden, campo }, 
        model: Equipamiento,
        type: QueryTypes.SELECT
    });
    equipamientos = rows[0];
    res.json({equipamientos});
}
export const getEquipamiento= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const equipamiento = await Equipamiento.findByPk(id);
    if (equipamiento) {
        res.json(equipamiento);
    }else{
        res.status(404).json({
            msg: `No existe un equipamiento con el id ${id}`
        });
    }
}
export const postEquipamiento= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {nombre}=req.body;
    
    try {
        //Guardamos en BD
        const equipamiento = await Equipamiento.create({nombre,estado:1});
        res.json(equipamiento);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putEquipamiento= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {nombre,estado}=req.body;
    
    try {
        const equipamiento = await Equipamiento.findByPk(id);
        if (!equipamiento) {
            return res.status(404).json({
                msg: `No existe un equipamiento con el id ${id}`
            })
        }
        await equipamiento.update({nombre, estado});
        res.json(equipamiento);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deleteEquipamiento=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const equipamiento = await Equipamiento.findByPk(id);
    if (!equipamiento) {
        return res.status(404).json({
            msg: `No existe un equipamiento con el id ${id}`
        })
    }
    //await categoria.destroy();
    await equipamiento.update({estado:false});
    res.json({
        msg: 'Equipamiento borrado'
    })
}
