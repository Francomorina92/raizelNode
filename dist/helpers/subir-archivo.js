"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        //validar extension
        if (!extensionesValidas.includes(extension)) {
            return reject('La extension no es valida. Solo se admiten png, jpg y jpeg');
        }
        const nombreTemporal = (0, uuid_1.v4)() + '.' + extension;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', carpeta, nombreTemporal);
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err)
                return reject(err);
            return resolve(nombreTemporal);
        });
    });
};
exports.subirArchivo = subirArchivo;
//# sourceMappingURL=subir-archivo.js.map