import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import Usuario from "../models/usuario";

const validarJWT =async (req: Request, res: Response, next: Function)=>{
    const token=req.header('accessToken');
    if (!token) {
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }
    try {
        
        //validar el token
        const secretKey = process.env.SECRETORPRIVATEKEY || '';
        const {uid} = (jwt.verify(token, secretKey) as any);
        (req as any).uid = uid;
        const user = await Usuario.findByPk(uid);
        //Verificar si el user esta activo
        if (!user) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${uid}`
            })
        }
        if (!(user as any).estado) {
            return res.status(401).json({
                msg: `El usuario con el id ${uid} no esta habilitado`
            })
        }        
        (req as any).user = user;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}
export default validarJWT;