import { Request, Response } from "express";
import Calificacion from '../models/calificacion';
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";


export const getCalificaciones= async (req:Request ,res:Response)=>{
    const {limite = 500,desde = 0,orden = 'desc',campo = 'updatedAt', perfil = 1}= req.query;
    
    const rows = await db.query('call getCalificaciones(:perfil, :limite, :desde, :orden, :campo)', { 
        replacements: { perfil, limite, desde, orden, campo }, 
        model: Calificacion,
        type: QueryTypes.SELECT
      });
      const calificaciones = rows[0];
    res.json({calificaciones});
}
export const getCalificacion= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const calificacion = await Calificacion.findByPk(id);
    if (calificacion) {
        res.json(calificacion);
    }else{
        res.status(404).json({
            msg: `No existe una calificacion con el id ${id}`
        });
    }
}
export const postCalificacion= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {mensaje,calificacion,idPerfil,idUsuario}=req.body;
    
    try {
        //Guardamos en BD
        const vCalificacion = await Calificacion.create({mensaje,calificacion,idPerfil,idUsuario,estado:1});
        res.json(vCalificacion);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putCalificacion= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {mensaje,calificacion,idPerfil,idUsuario,estado}=req.body;
    
    try {
        const vCalificacion = await Calificacion.findByPk(id);
        if (!vCalificacion) {
            return res.status(404).json({
                msg: `No existe una calificacion con el id ${id}`
            })
        }
        await vCalificacion.update({mensaje,calificacion,idPerfil,idUsuario,estado});
        res.json(vCalificacion);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deleteCalificacion=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const calificacion = await Calificacion.findByPk(id);
    if (!calificacion) {
        return res.status(404).json({
            msg: `No existe una calificacion con el id ${id}`
        })
    }
    //await calificacion.destroy();
    await calificacion.update({estado:false});
    res.json({
        msg: 'Calificacion borrada'
    })
}
