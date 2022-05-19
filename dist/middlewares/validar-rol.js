"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esAdminRol = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: ' Se quiere validar el role sin validar el token primero'
        });
    }
    const { rol } = req.user;
    //Si no es a si mismo, preguntamos si es administrador
    if (rol != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `No es administrador`
        });
    }
    next();
};
exports.default = esAdminRol;
//# sourceMappingURL=validar-rol.js.map