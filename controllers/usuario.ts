import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from "bcryptjs";
import Perfil from "../models/perfil";
const { QueryTypes } = require('sequelize');
import db from "../db/conecction";
import { transporter } from "../mailer";
import { generarJWTRegistro } from "../helpers/generar-jwt";
import jwt from "jsonwebtoken";

export const getUsuarios= async (req:Request ,res:Response)=>{
    const {limite = 5,desde = 1,orden = 'asc',campo = 'id', filtro = ''}= req.query; 
    let usuarios=null; 
    
    const rows = await db.query('call getUsuarios(:filtro, :limite, :desde, :orden, :campo)', { 
        replacements: { filtro, limite, desde, orden, campo }, 
        model: Usuario,
        type: QueryTypes.SELECT
    });
    usuarios = rows[0];
    res.json({usuarios});
}
export const getUsuario= async(req:Request ,res:Response)=>{
    const {id}=req.params;

    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}
export const postUsuario= async (req:Request ,res:Response)=>{

    //Obtenemos los datos por el post
    let {password,email,img='', nombre}=req.body;
    email = email.toUpperCase()
    try {
        
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        const pass = bcryptjs.hashSync(password, salt);
        
        //Guardamos en BD
        const usuario = await Usuario.create({password:pass,email,rol:'USER_ROLE',img,google:false,estado:1});
        if (!usuario) {
            res.status(500).json({
                msg: 'Hable con el administrador'
            })
        }
        const perfil = await Perfil.create({nombre: nombre, estado: 1, idUsuario: (usuario as any).id})

        //Generar el JWT
        const token = await generarJWTRegistro(usuario.getDataValue('id'));
        try {
            // send mail with defined transport object
            await transporter.sendMail({
                from: '"Registro 👻" <raizel@gmail.com>', // sender address
                to: (usuario as any).email, // list of receivers
                subject: "Confirma tu dirección de correo electrónico en Raizel", // Subject line
                //text: "Hello world?", // plain text body
                html: `
                <div style="margin-left: 20px;">
                <p>Hola, <span style="color: #2CB1BC;">${(perfil as any).nombre}</span> </p> 
            
                <p>    Acabas de crear una cuenta de Raizel. Para completar el registro, tan solo tienes que verificar tu dirección de correo electrónico. Pulsa en el botón de aquí abajo:</p> <br>
                <div style="display: block;
                text-align: center;">
                <a href="https://local:8080/confirmacion/tk=${token}" 
                style="background-color: #2CB1BC;
                    color: white;
                    padding: 15px 25px;
                    text-decoration: none;">COMPLETA TU REGISTRO</a>
                </div>
                <br>  
                
                <p>o copia y pega la siguiente URL en la barra de direcciones de tu navegador: https://local:8080/confirmacion/${token}</p>
                <p>¡y comienza tu aventura ya!</p>
                
                <p>Saludos. El equipo de Raizel</p>
            </div>                
                `,
            });
            await usuario.update({confirmacion: token});
        } catch (error) {
            res.status(400).json({
                msg:'Ocurrio un error al enviar el mail'
            })
        }
        res.json({usuario, perfil});
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}
export const putUsuario= async (req:Request ,res:Response)=>{
    const {id}=req.params;
    let {password,email,role,img}=req.body;
    email = email.toUpperCase()
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }
        await usuario.update({email,role,img});
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const DeleteUsuario=async (req:Request ,res:Response)=>{
    const {id}=req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
    //await usuario.destroy();
    await usuario.update({estado:false});
    res.json({
        msg: 'usuario borrado'
    })
}
