import dotenv from 'dotenv';
import Server from './models/server';

//Configurar docenv
dotenv.config();
const server = new Server();
server.listen();