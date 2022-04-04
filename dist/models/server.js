"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const categoria_1 = __importDefault(require("../routes/categoria"));
const musculo_1 = __importDefault(require("../routes/musculo"));
const equipamiento_1 = __importDefault(require("../routes/equipamiento"));
const perfil_1 = __importDefault(require("../routes/perfil"));
const calificacion_1 = __importDefault(require("../routes/calificacion"));
const like_1 = __importDefault(require("../routes/like"));
const conecction_1 = __importDefault(require("../db/conecction"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            musculos: '/api/musculos',
            equipamientos: '/api/equipamientos',
            perfiles: '/api/perfiles',
            calificaciones: '/api/calificaciones',
            likes: '/api/likes',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conecction_1.default.authenticate();
                console.log('Base de datos online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default),
            this.app.use(this.apiPaths.categorias, categoria_1.default),
            this.app.use(this.apiPaths.musculos, musculo_1.default),
            this.app.use(this.apiPaths.equipamientos, equipamiento_1.default),
            this.app.use(this.apiPaths.perfiles, perfil_1.default),
            this.app.use(this.apiPaths.calificaciones, calificacion_1.default),
            this.app.use(this.apiPaths.likes, like_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port + '!!');
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map