import Rol from "../models/rol";
import Usuario from "../models/usuario";

export const esRoleValido =  async(rol='')=>{
    const existeRol= await Rol.findOne({
        where:{
            nombre: rol
        }
    });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}
//Verificamos si el mail existe
export const existeEmail = async(email = '')=>{
    const existe =await Usuario.findOne({
        where:{
            email: email
        }
    })
    if (existe) {
        throw new Error(`Ya existe un usuario con el email  ${email}`);
    }
}
export const esUsuarioValido =  async(idUsuario='')=>{
    const existeUsuario= await Usuario.findByPk(idUsuario);
    if (!existeUsuario) {
        throw new Error(`El usuario ${idUsuario} no esta registrado en la BD`);
    }
}

