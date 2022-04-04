import express,{Application} from 'express'
import cors from "cors";
import userRoutes from "../routes/usuario";
import categoriaRoutes from "../routes/categoria";
import musculoRoutes from "../routes/musculo";
import equipamientoRoutes from "../routes/equipamiento";
import perfilRoutes from "../routes/perfil";
import calificacionRoutes from "../routes/calificacion";
import likeRoutes from "../routes/like";
import db from '../db/conecction';
class Server {
    private app: Application;
    private port: string;
    private apiPaths={
        usuarios: '/api/usuarios',
        categorias: '/api/categorias',
        musculos: '/api/musculos',
        equipamientos: '/api/equipamientos',
        perfiles: '/api/perfiles',
        calificaciones: '/api/calificaciones',
        likes: '/api/likes',
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
        this.app.use(this.apiPaths.usuarios, userRoutes),
        this.app.use(this.apiPaths.categorias, categoriaRoutes),
        this.app.use(this.apiPaths.musculos, musculoRoutes),
        this.app.use(this.apiPaths.equipamientos, equipamientoRoutes),
        this.app.use(this.apiPaths.perfiles, perfilRoutes),
        this.app.use(this.apiPaths.calificaciones, calificacionRoutes),
        this.app.use(this.apiPaths.likes, likeRoutes)
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto '+ this.port +'!!');
        })
    }
}
export default Server;