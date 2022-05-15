import { Request, Response } from "express";
import Ejercicio from '../models/ejercicio';
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";

export const getEjercicios= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 1,orden = 'desc',campo = 'nombre', filtro = '', id = 2}= req.query; 
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
    const {nombre,color,preparacion,ejecucion,detalles,idCategoria,idMusculoPrincipal,idMusculoSecundario,idEquipamiento,idPerfil}=req.body;
    
    try {
        //Guardamos en BD
        const ejercicio = await Ejercicio.create({nombre,color,preparacion,ejecucion,detalles,idCategoria,idMusculoPrincipal,idMusculoSecundario,idEquipamiento,idPerfil,estado:1});
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
