import { Request, Response } from "express";
import  path  from "path";
import fileUpload from 'express-fileupload'
import { v4 as uuidv4 } from 'uuid';

export const subirArchivo = (files: any, extensionesValidas = ['png','jpg','jpeg'], carpeta = '')=>{
    return new Promise((resolve, reject)=>{
        const { archivo } = files;
        const nombreCortado = (archivo as any).name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        //validar extension
        if(!extensionesValidas.includes(extension)){
            return reject(
                'La extension no es valida. Solo se admiten png, jpg y jpeg'
            )
        }
        const nombreTemporal = uuidv4() + '.' + extension; 
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemporal);
        

        // Use the mv() method to place the file somewhere on your server
        (archivo as any).mv(uploadPath, (err: any)=> {
            if (err)
            return reject(err);
            return resolve(nombreTemporal);
        });
    });
    
};