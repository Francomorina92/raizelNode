import express,{Application} from 'express'
import cors from "cors";
import userRoutes from "../routes/usuario";
import categoriaRoutes from "../routes/categoria";
import musculoRoutes from "../routes/musculo";
import equipamientoRoutes from "../routes/equipamiento";
import db from '../db/conecction';
class Server {
    private app: Application;
    private port: string;
    private apiPaths={
        usuarios: '/api/usuarios',
        categorias: '/api/categorias',
        musculos: '/api/musculos',
        equipamientos: '/api/equipamientos',
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
        this.app.use(this.apiPaths.equipamientos, equipamientoRoutes)
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto '+ this.port +'!!');
        })
    }
}
export default Server;