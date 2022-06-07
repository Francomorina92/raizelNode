import { Request, Response } from "express";
import Like from '../models/like';
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";

export const getLikes= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 1,orden = 'desc',campo = 'updatedAt', rutina = 1}= req.query; 
    const rows = await db.query('call getLikes(:rutina, :limite, :desde, :orden, :campo)', { 
        replacements: { rutina, limite, desde, orden, campo }, 
        model: Like,
        type: QueryTypes.SELECT
    });
    const likes = rows[0];
    res.json({likes});
}
export const getLike= async(req:Request ,res:Response)=>{
    const {rutina,perfil}=req.body;
    
    const like = await Like.findAll({
        where:{
            idRutina: rutina,
            idPerfil: perfil,
            estado: true
        }
    });    
    
    if (like[0] != undefined) {
        res.json(true);
    }else{
        res.json(false);
    }
}
export const postLike= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {idPerfil,idRutina, like}=req.body;
    
    try {        
        let likeBase = await Like.findAll({
            where:{
                idRutina: idRutina,
                idPerfil: idPerfil
            }
        });
        
        
        if (likeBase[0] != undefined) {
            await likeBase[0].update({idPerfil,idRutina,estado: like });
            res.json(like);
        }else{
            await Like.create({idPerfil,idRutina,estado:1});
            res.json(true);
        }
       
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putLike= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {idPerfil,idRutina,estado}=req.body;
    
    try {
        const like = await Like.findByPk(id);
        if (!like) {
            return res.status(404).json({
                msg: `No existe un like con el id ${id}`
            })
        }
        await like.update({idPerfil,idRutina,estado});
        res.json({msg: 'Like actualizado perfectamente'});
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deleteLike=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const like = await Like.findByPk(id);
    if (!like) {
        return res.status(404).json({
            msg: `No existe un like con el id ${id}`
        })
    }
    //await like.destroy();
    await like.update({estado:false});
    res.json({
        msg: 'Like borrado'
    })
}
