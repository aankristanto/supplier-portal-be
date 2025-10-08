import { DataTypes } from "sequelize";
import db from "../config/database.js";

const UserModel = db.define("xref_user", {
  ID: {
    type: DataTypes.STRING(255),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  INITIAL: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  PASSWORD: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  NAME: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  GENDER: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  NO_TELEPHONE: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  EMAIL: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  COMPANY_ID: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ADDRESS: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  POSITION: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  LEVEL: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  TOKEN: {
    type: DataTypes.STRING(350),
    allowNull: true,
  },
  REF_TOKEN: {
    type: DataTypes.STRING(350),
    allowNull: true,
  },
  SUMMARY: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  USER_PATH: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  IS_LOGGINED: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'xref_user',
  timestamps: false,
});

export default UserModel;