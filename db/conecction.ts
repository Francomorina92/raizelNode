import { Sequelize } from "sequelize";

const db = new Sequelize('raizel','root','root',{
    host: 'localhost',
    dialect:'mysql'
});
export default db;