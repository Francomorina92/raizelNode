import { Request, Response } from "express";
import Ejercicio from '../models/ejercicio';
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";
import Perfil from "../models/perfil";

export const getEjercicios= async (req:Request ,res:Response)=>{
    let {limite = 5,desde = 1,orden = 'desc',campo = 'nombre', filtro = '', id = 0}= req.query; 
    if (!(req as any).user) {
        return res.status(500).json({
            msg:' Se quiere validar el token primero'
        })
    } 
    const per = await Perfil.findOne({
        where:{
            idUsuario: (req as any).user.id
        }
    }); 
    if (id == 0) {
        id = (per as any).id
    }
    let ejercicios=null;     
    
    const rows = await db.query('call getEjercicios(:filtro, :id, :limite, :desde, :orden, :campo)', { 
        replacements: { filtro, id, limite, desde, orden, campo }, 
        model: Ejercicio,
        type: QueryTypes.SELECT
    });
    ejercicios = rows[0];
    res.json({ejercicios});
}
export const getEjercicio= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const ejercicio = await Ejercicio.findByPk(id);
    if (ejercicio) {
        res.json(ejercicio);
    }else{
        res.status(404).json({
            msg: `No existe un ejercicio con el id ${id}`
        });
    }
}
export const postEjercicio= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {nombre,color,preparacion,ejecucion,detalles,idCategoria,idMusculoPrincipal,idMusculoSecundario,idEquipamiento}=req.body;
    if (!(req as any).user) {
        return res.status(500).json({
            msg:' Se quiere validar el token primero'
        })
    } 
    const per = await Perfil.findOne({
        where:{
            idUsuario: (req as any).user.id
        }
    }); 
    const id = (per as any).id
    try {
        //Guardamos en BD
        const ejercicio = await Ejercicio.create({nombre,color,preparacion,ejecucion,detalles,idCategoria,idMusculoPrincipal,idMusculoSecundario,idEquipamiento,idPerfil: id,estado:1});
        res.json(ejercicio);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putEjercicio= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const {nombre,color,preparacion,ejecucion,detalles,idCategoria,idMusculoPrincipal,idMusculoSecundario,idEquipamiento,idPerfil,estado}=req.body;
    
    try {
        const ejercicio = await Ejercicio.findByPk(id);
        if (!ejercicio) {
            return res.status(404).json({
                msg: `No existe un ejercicio con el id ${id}`
            })
        }
        await ejercicio.update({nombre,color,preparacion,ejecucion,detalles,idCategoria,idMusculoPrincipal,idMusculoSecundario,idEquipamiento,idPerfil,estado});
        res.json(ejercicio);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deleteEjercicio=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const ejercicio = await Ejercicio.findByPk(id);
    if (!ejercicio) {
        return res.status(404).json({
            msg: `No existe un ejercicio con el id ${id}`
        })
    }
    //await ejercicio.destroy();
    await ejercicio.update({estado:false});
    res.json({
        msg: 'Ejercicio borrado'
    })
}
