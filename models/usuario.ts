import { DataTypes } from "sequelize";
import db from "../db/conecction";

const Usuario= db.define('Usuario',{
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING
    },
    google: {
        type: DataTypes.BOOLEAN
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
});
Usuario.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
 
    delete values.password;
    return values;
}

export default Usuario;
