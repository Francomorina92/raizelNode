import { Request, Response } from "express";
import Calificacion from '../models/calificacion';


export const getCalificaciones= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 1,orden = 'desc',campo = 'updatedAt'}= req.query; 
    
    const calificaciones= await Calificacion.findAndCountAll(
        {
            limit:Number(limite),
            offset:Number(desde),
            order: [[String(campo),String(orden)]]
        }
    );
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
        console.log(error);
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
        res.json({msg: 'Calificacion actualizada perfectamente'});
    } catch (error) {
        console.log(error);
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
