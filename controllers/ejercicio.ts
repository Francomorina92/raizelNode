import { Request, Response } from "express";
import Ejercicio from '../models/ejercicio';


export const getEjercicios= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 1,orden = 'desc',campo = 'nombre'}= req.query; 
    
    const ejercicios= await Ejercicio.findAndCountAll(
        {
            limit:Number(limite),
            offset:Number(desde),
            order: [[String(campo),String(orden)]]
        }
    );
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
        console.log(error);
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
        res.json({msg: 'Ejercicio actualizado perfectamente'});
    } catch (error) {
        console.log(error);
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
