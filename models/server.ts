import express,{Application} from 'express'
import cors from "cors";

import calificacionRoutes from "../routes/calificacion";
import categoriaRoutes from "../routes/categoria";
import equipamientoRoutes from "../routes/equipamiento";
import likeRoutes from "../routes/like";
import musculoRoutes from "../routes/musculo";
import perfilRoutes from "../routes/perfil";
import rutinaRoutes from "../routes/rutina";
import userRoutes from "../routes/usuario";
import ejercicioRoutes from "../routes/ejercicio";

import db from '../db/conecction';
class Server {
    private app: Application;
    private port: string;
    private apiPaths={
        calificaciones: '/api/calificaciones',
        categorias: '/api/categorias',
        equipamientos: '/api/equipamientos',
        likes: '/api/likes',
        musculos: '/api/musculos',
        perfiles: '/api/perfiles',
        rutinas: '/api/rutinas',
        usuarios: '/api/usuarios',
        ejercicios: '/api/ejercicios',
    }
    constructor() {
        this.app=express();
        this.port= process.env.PORT ||'8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Base de datos online');
            
        } catch (error:any) {
            throw new Error(error);
            
        }
    }
    middlewares(){
        //CORS
        this.app.use(cors())
        //Lectura del body
        this.app.use(express.json())
        //Carpeta publica
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use(this.apiPaths.calificaciones, calificacionRoutes),
        this.app.use(this.apiPaths.categorias, categoriaRoutes),
        this.app.use(this.apiPaths.equipamientos, equipamientoRoutes),
        this.app.use(this.apiPaths.likes, likeRoutes),
        this.app.use(this.apiPaths.musculos, musculoRoutes),
        this.app.use(this.apiPaths.perfiles, perfilRoutes),
        this.app.use(this.apiPaths.rutinas, rutinaRoutes),
        this.app.use(this.apiPaths.usuarios, userRoutes),
        this.app.use(this.apiPaths.ejercicios, ejercicioRoutes)
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto '+ this.port +'!!');
        })
    }
}
export default Server;