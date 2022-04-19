import { Request, Response } from "express";
import Musculo from '../models/musculo';


export const getMusculos= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 0,orden = 'asc',campo = 'nombre'}= req.params; 
    
    const musculos= await Musculo.findAndCountAll(
        {
            limit:Number(limite),
            offset:Number(desde),
            order: [[String(campo),String(orden)]]
        }
    );
    res.json({musculos});
}
export const getMusculo= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const musculo = await Musculo.findByPk(id);
    if (musculo) {
        res.json(musculo);
    }else{
        res.status(404).json({
            msg: `No existe un musculo con el id ${id}`
        });
    }
}
export const postMusculo= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {nombre}=req.body;
    
    try {
        //Guardamos en BD
        const musculo = await Musculo.create({nombre,estado:1});
        res.json(musculo);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putMusculo= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {nombre,estado}=req.body;
    
    try {
        const musculo = await Musculo.findByPk(id);
        if (!musculo) {
            return res.status(404).json({
                msg: `No existe un musculo con el id ${id}`
            })
        }
        await musculo.update({nombre, estado});
        res.json(musculo);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deleteMusculo=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const musculo = await Musculo.findByPk(id);
    if (!musculo) {
        return res.status(404).json({
            msg: `No existe un musculo con el id ${id}`
        })
    }
    //await categoria.destroy();
    await musculo.update({estado:false});
    res.json({
        msg: 'Musculo borrado'
    })
}
