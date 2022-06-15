import Rol from "../models/rol";
import Usuario from "../models/usuario";
import Perfil from "../models/perfil";
import Rutina from "../models/rutina";
import Musculo from "../models/musculo";
import Equipamiento from "../models/equipamiento";
import Categoria from "../models/categoria";

export const esRoleValido =  async(rol='')=>{
    let existeRol;
    if (rol=='') {
        existeRol = true;
    }else{
        existeRol= await Rol.findOne({
            where:{
                nombre: rol
            }
        });
    }
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}
//Verificamos si el mail existe
export const existeEmail = async(email = '')=>{
    email = email.toUpperCase()
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
export const coleccionesPermitidas =  async(coleccion = '', colecciones: Array<string>= [])=>{
    const incluida = colecciones.includes(coleccion)
    if (!incluida) {
        throw new Error(`La coleccion no es permitida`);
    }
    return true;
}
export const esPerfilValido =  async(idPerfil='')=>{
    const existePerfil= await Perfil.findByPk(idPerfil);
    if (!existePerfil) {
        throw new Error(`El perfil ${idPerfil} no esta registrado en la BD`);
    }
}
export const esRutinaValida =  async(idRutina='')=>{
    const existeRutina= await Rutina.findByPk(idRutina);
    if (!existeRutina) {
        throw new Error(`La rutina ${idRutina} no esta registrada en la BD`);
    }
}
export const esMusculoValido =  async(idMusculo='')=>{
    const existeMusculo= await Musculo.findByPk(idMusculo);
    if (!existeMusculo) {
        throw new Error(`El musculo ${idMusculo} no esta registrado en la BD`);
    }
}
export const esEquipamientoValido =  async(idEquipamiento='')=>{
    const existeEquipamiento= await Equipamiento.findByPk(idEquipamiento);
    if (!existeEquipamiento) {
        throw new Error(`El equipamiento ${idEquipamiento} no esta registrado en la BD`);
    }
}
export const esCategoriaValida =  async(idCategoria='')=>{
    const existeCategoria= await Categoria.findByPk(idCategoria);
    if (!existeCategoria) {
        throw new Error(`La Categoria ${idCategoria} no esta registrada en la BD`);
    }
}

