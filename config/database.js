import dotenv from "dotenv";
import tedious from "tedious";
import { Sequelize } from "sequelize";
dotenv.config();
tedious.Connection;

const { DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT } = process.env;


const db = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASS}`, {
  host: `${DB_HOST}`,
  port: Number(DB_PORT),
  dialect: "mariadb",
  logging: false,
  timezone: "+07:00",
  dialectOptions: {
    timezone: "local",
  },
});


export default db;
