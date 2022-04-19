import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from "../models/usuario";
import { generarJWT } from "../helpers/generar-jwt";
export const login = async ( req: Request, res:Response, next:Function)=>{
    const { correo, password } = req.body;
    try {
        //Verificar si el mail existe
        const usuario = await Usuario.findOne({
            where:{
                email: correo
            }
        })
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo no es correcto'
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