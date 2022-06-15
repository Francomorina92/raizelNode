import { Request, Response } from "express";
import  path  from "path";
import  fs  from "fs";
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid';
import { subirArchivo } from "../helpers/subir-archivo";
import Usuario from "../models/usuario";
import Ejercicio from "../models/ejercicio";
import Rutina from "../models/rutina";
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";
/* cloudinary.config('cloudinary://687898186776262:LBH4rOuM49gwoHiMvlRgxWQrcOs@raizel'); */
cloudinary.config({ 
    cloud_name: 'raizel', 
    api_key: '687898186776262',
    api_secret: 'LBH4rOuM49gwoHiMvlRgxWQrcOs'
});
export const cargarArchivo = async (req:Request ,res:Response)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir.'});
    }
    try {
        const pathArchivo = await subirArchivo(req.files);
        res.json({nombreArchivo: pathArchivo});
    } catch (msg) {
        res.status(400).json({msg})
    }
    
}
export const actualizarArchivo = async (req:Request ,res:Response)=>{
    const {id, coleccion} = req.params;
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir.'});
    }
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findByPk(id);
            if (!modelo) {
                return res.status(400).json({msg:`No existe usuario con el id ${id}`});
            }
            break;
        case 'ejercicios':
            modelo = await Ejercicio.findByPk(id);
            if (!modelo) {
                return res.status(400).json({msg:`No existe ejercicio con el id ${id}`});
            }
            break;
        case 'rutinas':
            const rows = await db.query('call getRutina(:id)', { 
                replacements: { id }, 
                model: Rutina,
                type: QueryTypes.SELECT
            });
            let row = rows[0];
            modelo = (row as any)[0];
            
            if (!modelo) {
                return res.status(400).json({msg:`No existe rutina con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'se me olvido validar esto'});
    }
    
    //Limpiar imagenes previas
    try {
        if ((modelo as any).img) {
            const pathImagen = path.join( __dirname,'../uploads/',coleccion,(modelo as any).img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
        
        const pathArchivo = await subirArchivo(req.files, undefined, coleccion);
        modelo.update({img: pathArchivo});
        res.json({nombreArchivo: pathArchivo, modelo: modelo});
    } catch (msg) {
        res.status(400).json({msg})
    }
   
    
}
export const actualizarArchivoCloudinary = async (req:Request ,res:Response)=>{
    const {id, coleccion} = req.params;
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir.'});
    }
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findByPk(id);
            if (!modelo) {
                return res.status(400).json({msg:`No existe usuario con el id ${id}`});
            }
            break;
        case 'ejercicios':
            modelo = await Ejercicio.findByPk(id);
            if (!modelo) {
                return res.status(400).json({msg:`No existe ejercicio con el id ${id}`});
            }
            break;
        case 'rutinas':
            const rows = await db.query('call getRutina(:id)', { 
                replacements: { id }, 
                model: Rutina,
                type: QueryTypes.SELECT
            });
            let row = rows[0];
            modelo = (row as any)[0];
            
            if (!modelo) {
                return res.status(400).json({msg:`No existe rutina con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'se me olvido validar esto'});
    }
    
    //Limpiar imagenes previas
    try {
        if ((modelo as any).img) {
           const nombreArr = modelo.img.split('/');
           const nombre = nombreArr[nombreArr.length -1]
           const [ public_id ] = nombre.split('.');
           cloudinary.uploader.destroy(public_id);
        }
        const temporal = req.files?.archivo;
        /* res.json({temporal: (temporal as any).tempFilePath}) */
        
        const respuesta = await cloudinary.uploader.upload((temporal as any).tempFilePath)
        modelo.update({img: respuesta.secure_url});
        res.json({nombreArchivo: respuesta.secure_url});
    } catch (msg) {
        res.status(400).json({msg})
    }
   
    
}
export const mostrarImagen = async (req:Request ,res:Response)=>{
    const {id, coleccion} = req.params;
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findByPk(id);
            if (!modelo) {
                return res.status(400).json({msg:`No existe usuario con el id ${id}`});
            }
            break;
        case 'ejercicios':
            modelo = await Ejercicio.findByPk(id);
            if (!modelo) {
                return res.status(400).json({msg:`No existe ejercicio con el id ${id}`});
            }
            break;
        case 'rutinas':
            const rows = await db.query('call getRutina(:id)', { 
                replacements: { id }, 
                model: Rutina,
                type: QueryTypes.SELECT
            });
            let row = rows[0];
            modelo = (row as any)[0];
            
            if (!modelo) {
                return res.status(400).json({msg:`No existe rutina con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'se me olvido validar esto'});
    }
    
    //Limpiar imagenes previas
    try {
        if ((modelo as any).img) {
            const pathImagen = path.join( __dirname,'../uploads/',coleccion,(modelo as any).img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile( pathImagen)
            }
        }
    } catch (msg) {
        res.status(400).json({msg})
    }
    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);      
}
