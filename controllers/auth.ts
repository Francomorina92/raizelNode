import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from "../models/usuario";
import { transporter } from "../mailer";
import { generarJWT, generarJWTRegistro } from "../helpers/generar-jwt";
import jwt from "jsonwebtoken";
import Perfil from "../models/perfil";
export const login = async ( req: Request, res:Response, next:Function)=>{
    let { email, password } = req.body;
    email = email.toUpperCase()
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
        }else if(!usuario.getDataValue('verificado')){
            //Si el usuario no esta activo
            return res.status(400).json({
                msg: 'Debe confirmar el email'
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
export const confirmacionEmail = async ( req: Request, res:Response, next:Function)=>{
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            msg:'El link no es valido'
        })
    }
    try {
        
        //validar el token
        const secretKey = process.env.SECRETORPRIVATEKEYREGISTRO || '';
        const {uid} = (jwt.verify(token, secretKey) as any);
        (req as any).uid = uid;
        const user = await Usuario.findByPk(uid);
        //Verificar si el user esta activo
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario`
            })
        }
        if ((user as any).estado) {
            return res.status(400).json({
                msg: `El usuario esta inactivo`
            })
        }  
        if ((user as any).confirmacion != token) {
            return res.status(400).json({
                msg: `El link no es valido. Vuelva a intentarlo`
            })
        }      
        await user.update({confirmacion: '0', verificado: true});
        res.json({
            verificado: true
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Enlace No valido. Vuelva a pedir el mail de confirmacion'
        })
    }
}
export const recuperar = async ( req: Request, res:Response, next:Function)=>{
    let { email } = req.body;
    email = email.toUpperCase()
    if (!email) {
        return res.status(400).json({
            msg:'El email es obligatorio'
        })
    }
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
        }else if(!usuario.getDataValue('verificado')){
            //Si el usuario no esta activo
            return res.status(400).json({
                msg: 'Debe confirmar el email'
            });
        }
        const perfil = await Perfil.findOne({
            where:{
                idUsuario: usuario.getDataValue('id')
            }
        })
        //Generar el JWT
        const token = await generarJWTRegistro(usuario.getDataValue('id'));
        await transporter.sendMail({
            from: '"Recuperar contraseña 👻" <raizel@gmail.com>',
            to: (usuario as any).email, 
            subject: "Recupero de contraseña",
            html: `
            <div style="margin: 0 auto; width: 80%">
            <p>Hola, <span style="color: #2CB1BC;">${(perfil as any).nombre}</span> </p> 
        
            <p>Recibimos un pedido para recuperar tu contraseña. Sólo es necesario que hagas click para seguir las instrucciones. Pulsa en el botón de aquí abajo:</p> <br>
            <div style="display: block;
            text-align: center;">
            <a href="https://local:8080/recuperacion/${token}" 
            style="background-color: #2CB1BC;
                color: white;
                padding: 15px 25px;
                text-decoration: none;">Recuperar Contraseña</a>
            </div>
            <br>  
            
            <p>o copia y pega la siguiente URL en la barra de direcciones de tu navegador: https://local:8080/recuperacion/${token}</p>
            <p>Este mensaje es confidencial.
            Si usted ha recibido este e-mail por error, debera eliminarlo de su sistema.
            No debera copiar el mensaje ni divulgar su contenido a ninguna persona.
            Muchas gracias.</p>
            
            <p>Saludos. El equipo de Raizel</p>
        </div>                
            `,
        });
        await usuario.update({recuperacion: token});
        res.json({
            recuperado: true
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Error al recuperar el usuario'
        })
    }
}
export const cambiarPassword = async ( req: Request, res:Response, next:Function)=>{
    const { token, password } = req.body;
    if (!token) {
        return res.status(400).json({
            msg:'El link no es valido'
        })
    }
    try {
        //validar el token
        const secretKey = process.env.SECRETORPRIVATEKEYREGISTRO || '';
        const {uid} = (jwt.verify(token, secretKey) as any);
        (req as any).uid = uid;
        const user = await Usuario.findByPk(uid);
        //Verificar si el user esta activo
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario`
            })
        }
        if (!(user as any).estado) {
            return res.status(400).json({
                msg: `El usuario esta inactivo`
            })
        }  
        if ((user as any).recuperacion != token) {
            return res.status(400).json({
                msg: `El link no es valido. Vuelva a intentarlo`
            })
        }      
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        const pass = bcryptjs.hashSync(password, salt);
        await user.update({recuperacion: '0', password: pass});
        res.json({
            correcto: true
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Enlace No valido. Vuelva a pedir el cambio de contraseña'
        })
    }
}