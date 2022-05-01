import { Request, Response } from "express";
import Rutina from '../models/rutina';
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";

export const getRutinas= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 1,orden = 'asc',campo = 'nombre', perfil = 0}= req.query; 
    let rutinas = null;
    if (perfil!=0) {
        const rows = await db.query('call getRutinas(:perfil, :limite, :desde, :orden, :campo)', { 
            replacements: { perfil, limite, desde, orden, campo }, 
            model: Rutina,
            type: QueryTypes.SELECT
        });
        rutinas = rows[0];
    }else{
        rutinas = await Rutina.findAndCountAll(
            {
                limit:Number(limite),
                offset:Number(desde),
                order: [[String(campo),String(orden)]]
            }
        );
    }
    res.json({rutinas});
}
export const getRutina= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const rutina = await Rutina.findByPk(id);
    if (rutina) {
        res.json(rutina);
    }else{
        res.status(404).json({
            msg: `No existe una rutina con el id ${id}`
        });
    }
}
export const postRutina= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {nombre,idPerfil}=req.body;
    
    try {
        //Guardamos en BD
        const rutina = await Rutina.create({nombre,idPerfil,estado:1});
        res.json(rutina);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putRutina= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {nombre,idPerfil,estado}=req.body;
    
    try {
        const rutina = await Rutina.findByPk(id);
        if (!rutina) {
            return res.status(404).json({
                msg: `No existe una rutina con el id ${id}`
            })
        }
        await rutina.update({nombre,idPerfil,estado});
        res.json({msg: 'Rutina actualizada perfectamente'});
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deleteRutina=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const rutina = await Rutina.findByPk(id);
    if (!rutina) {
        return res.status(404).json({
            msg: `No existe una rutina con el id ${id}`
        })
    }
    //await rutina.destroy();
    await rutina.update({estado:false});
    res.json({
        msg: 'Rutina borrada'
    })
}
