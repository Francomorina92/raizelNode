import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import Usuario from "../models/usuario";
const esAdminRol = (req: Request, res: Response, next : Function) => {
    if (!(req as any).user) {
        return res.status(500).json({
            msg:' Se quiere validar el role sin validar el token primero'
        })
    }
    const {rol,id} = (req as any).user
    console.log('id'+req.params.id);
    //Comprobamos si la accion que desea realizas es a si mismo
    if (id!=req.params.id){
        //Si no es a si mismo, preguntamos si es administrador
        if (rol!='ADMIN_ROLE') {
            return res.status(401).json({
                msg: `No es administrador`
            })
        }
    }    
    next();
}
export default esAdminRol;