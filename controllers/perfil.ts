import { Request, Response } from "express";
import Perfil from '../models/perfil';


export const getPerfiles= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 1,orden = 'asc',campo = 'nombre'}= req.query; 
    
    const perfiles= await Perfil.findAndCountAll(
        {
            limit:Number(limite),
            offset:Number(desde),
            order: [[String(campo),String(orden)]]
        }
    );
    res.json({perfiles});
}
export const getPerfil= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const perfil = await Perfil.findByPk(id);
    if (perfil) {
        res.json(perfil);
    }else{
        res.status(404).json({
            msg: `No existe un perfil con el id ${id}`
        });
    }
}
export const postPerfil= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {nombre,idUsuario,apellido,facebook,twitter,instagram,web}=req.body;
    
    try {
        //Guardamos en BD
        const perfil = await Perfil.create({nombre,idUsuario,apellido,facebook,twitter,instagram,web,estado:1});
        res.json(perfil);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putPerfil= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {nombre,idUsuario,apellido,facebook,twitter,instagram,web,estado}=req.body;
    
    try {
        const perfil = await Perfil.findByPk(id);
        if (!perfil) {
            return res.status(404).json({
                msg: `No existe un perfil con el id ${id}`
            })
        }
        await perfil.update({nombre,idUsuario,apellido,facebook,twitter,instagram,web,estado});
        res.json({msg: 'perfil actualizado perfectamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deletePerfil=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const perfil = await Perfil.findByPk(id);
    if (!perfil) {
        return res.status(404).json({
            msg: `No existe un perfil con el id ${id}`
        })
    }
    //await perfil.destroy();
    await perfil.update({estado:false});
    res.json({
        msg: 'Perfil borrado'
    })
}
