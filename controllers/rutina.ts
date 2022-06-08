import { Request, Response } from "express";
import Rutina from '../models/rutina';
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";
import Perfil from "../models/perfil";
import Detalle from '../models/detalleRutina';

export const getRutinas= async (req:Request ,res:Response)=>{
    const {limite = 50,desde = 0,orden = 'asc',campo = 'nombre', perfil = 0, favorita = false}= req.query;
    if (!(req as any).user) {
        return res.status(500).json({
            msg:' Se quiere validar el token primero'
        })
    }
    const {id} = (req as any).user;
    const per = await Perfil.findOne({
        where:{
            idUsuario: id
        }
    }); 
    const idP = (per as any).id
    
    let rutinas = null;
    if (perfil!=0) {
        if (favorita) {
            const rows = await db.query('call getRutinasFavoritas(:idP)', { 
                replacements: { idP, limite, desde, orden, campo }, 
                model: Rutina,
                type: QueryTypes.SELECT
            });
            rutinas = rows[0];
        }else{
            const rows = await db.query('call getRutinas(:idP, :limite, :desde, :orden, :campo)', { 
                replacements: { idP, limite, desde, orden, campo }, 
                model: Rutina,
                type: QueryTypes.SELECT
            });
            rutinas = rows[0];
        }
        
    }else{
        const rows = await db.query('call getRutinasTodas( :orden, :campo)', { 
            replacements: {orden, campo }, 
            model: Rutina,
            type: QueryTypes.SELECT
        });
        rutinas = rows[0];
        
    }
    res.json(rutinas);
}
export const getRutina= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    let rutina = {};
        const rows = await db.query('call getRutina(:id)', { 
            replacements: { id }, 
            model: Rutina,
            type: QueryTypes.SELECT
        });
        rutina = rows[0];
        
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
    const {nombre}=req.body;
    if (!(req as any).user) {
        return res.status(500).json({
            msg:' Se quiere validar el token primero'
        })
    }
    const {id} = (req as any).user;
    const perfil = await Perfil.findOne({
        where:{
            idUsuario: id
        }
    });
    try {
        //Guardamos en BD
        const rutina = await Rutina.create({nombre,idPerfil: (perfil as any).id, estado:1});
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

export const postDetalleRutina= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    const {
        idRutina,
        idEjercicio,
        tipoSerie,
        cantidadSerie,
        descanso,
        repeticionesUno,
        repeticionesDos,
        repeticionesTres,
        repeticionesCuatro,
        repeticionesCinco,
        cargaUno,
        cargaDos,
        cargaTres,
        cargaCuatro,
        cargaCinco,
        unidad,
        observaciones}=req.body;
    if (!(req as any).user) {
        return res.status(500).json({
            msg:' Se quiere validar el token primero'
        })
    }
    const {id} = (req as any).user;
    const perfil = await Perfil.findOne({
        where:{
            idUsuario: id
        }
    });
    try {
        //Guardamos en BD
        const detalle = await Detalle.create({
            idRutina,
            idEjercicio,
            tipoSerie,
            cantidadSerie,
            descanso,
            repeticionesUno,
            repeticionesDos,
            repeticionesTres,
            repeticionesCuatro,
            repeticionesCinco,
            cargaUno,
            cargaDos,
            cargaTres,
            cargaCuatro,
            cargaCinco,
            unidad,
            observaciones,
            estado:1});
        res.json(detalle);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const putDetalleRutina= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    //Obtenemos los datos por el put
    const {
        idRutina,
        idEjercicio,
        tipoSerie,
        cantidadSerie,
        descanso,
        repeticionesUno,
        repeticionesDos,
        repeticionesTres,
        repeticionesCuatro,
        repeticionesCinco,
        cargaUno,
        cargaDos,
        cargaTres,
        cargaCuatro,
        cargaCinco,
        unidad,
        observaciones}=req.body;
    if (!(req as any).user) {
        return res.status(500).json({
            msg:' Se quiere validar el token primero'
        })
    }
    
    try {
        
        let detalle = {};
        const rows = await db.query('call getRutina(:id)', { 
            replacements: { id }, 
            model: Detalle,
            type: QueryTypes.SELECT
        });
        detalle = rows[0];
        if (!detalle) {
            return res.status(404).json({
                msg: `No existe un detalle con el id ${id}`
            })
        }
        
        await (detalle as any)[0].update({idRutina,idEjercicio, tipoSerie, cantidadSerie, descanso, repeticionesUno, repeticionesDos, repeticionesTres, repeticionesCuatro, repeticionesCinco, cargaUno, cargaDos, cargaTres, cargaCuatro, cargaCinco, unidad, observaciones});
        res.json(detalle);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const getDetalle= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const detalle = await Detalle.findByPk(id);
    if (detalle) {
        res.json(detalle);
    }else{
        res.status(404).json({
            msg: `No existe una detalle con el id ${id}`
        });
    }
}

export const getDetalles= async (req:Request ,res:Response)=>{
    const {limite = 50,desde = 0,orden = 'asc',campo = 'updatedAt', rutina = 0}= req.query;
    if (!(req as any).user) {
        return res.status(500).json({
            msg:' Se quiere validar el token primero'
        })
    }
    
    
    let detalles = null;
    
    const rows = await db.query('call getDetalles(:rutina, :limite, :desde, :orden, :campo)', { 
        replacements: { rutina, limite, desde, orden, campo }, 
        model: Detalle,
        type: QueryTypes.SELECT
    });
    detalles = rows[0];    
    
    res.json(detalles);
}
