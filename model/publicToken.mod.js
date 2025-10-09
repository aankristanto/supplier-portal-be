import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PublicTokenModel = db.define("public_token", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  DESCRIPTION: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  TOKEN: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  SIGNATURE_CODE: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  APPROVE_BY: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  EXPIRED_DATE: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  UPDATED_AT: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'public_token',
  timestamps: false, 
});

export default PublicTokenModel;