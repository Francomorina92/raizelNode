import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from "../models/usuario";
import { generarJWT } from "../helpers/generar-jwt";
import jwt from "jsonwebtoken";
export const login = async ( req: Request, res:Response, next:Function)=>{
    const { email, password } = req.body;
    try {
        //Verificar si el mail existe
        const usuario = await Usuario.findOne({
            where:{
                email: email
            }
        })
        if (!usuario) {
            return res.status(400).json({
                msg: 'El email no es correcto'
            });
        }else if(!usuario.getDataValue('estado')){
            //Si el usuario no esta activo
            return res.status(400).json({
                msg: 'El usuario esta inactivo'
            });
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.getDataValue('password'));
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.getDataValue('id'));

        res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}
export const tokenValido = async ( req: Request, res:Response, next:Function)=>{
    const token=req.header('x-token');
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
        res.json({
            token: true
        })
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}