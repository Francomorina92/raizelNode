import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from "bcryptjs";
import Perfil from "../models/perfil";
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";

export const getUsuarios= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 1,orden = 'asc',campo = 'id', filtro = ''}= req.query; 
    let usuarios=null; 
    
    const rows = await db.query('call getUsuarios(:filtro, :limite, :desde, :orden, :campo)', { 
        replacements: { filtro, limite, desde, orden, campo }, 
        model: Usuario,
        type: QueryTypes.SELECT
    });
    usuarios = rows[0];
    /* const usuarios= await Usuario.findAndCountAll(
        {
            limit:Number(limite),
            offset:Number(desde),
            order: [[String(campo),String(orden)]]
        }
    ); */
    res.json({usuarios});
}
export const getUsuario= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}
export const postUsuario= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {password,email,img='', nombre}=req.body;
    
    try {
        
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        const pass = bcryptjs.hashSync(password, salt);
        //Guardamos en BD
        const usuario = await Usuario.create({password:pass,email,rol:'USER_ROLE',img,google:false,estado:1});
        if (!usuario) {
            res.status(500).json({
                msg: 'Hable con el administrador'
            })
        }
        const perfil = await Perfil.create({nombre: nombre, estado: 1, idUsuario: (usuario as any).id})
        res.json({usuario, perfil});
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}
export const putUsuario= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {password,email,role,img}=req.body;
    
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }
        await usuario.update({email,role,img});
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const DeleteUsuario=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
    //await usuario.destroy();
    await usuario.update({estado:false});
    res.json({
        msg: 'usuario borrado'
    })
}
