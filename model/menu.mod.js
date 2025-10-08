import { DataTypes } from "sequelize";
import db from "../config/database.js";

const MenuModel = db.define("xref_menu", {
  ID: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  CONTROL_ID: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  MODUL: {
    type: DataTypes.STRING(55),
    allowNull: true,
  },
  GROUP: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  GROUP_SUB: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  SUB: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  SUB_KEY: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  KEY: {
    type: DataTypes.STRING(55),
    allowNull: true,
  },
  FORM: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  NAME: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  TITLE: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  DESC: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  PATH: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ICON: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ACT_VIW: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_ADD: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_MOD: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_DEL: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_SAV: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_REF: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_SEL: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_USEL: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_FND: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_PRN: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_IMPORT: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  ACT_EXPORT: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  CREATED_ID: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  UPDATED_AT: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  UPDATED_ID: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  DOC: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ORDER: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'xref_menu',
  timestamps: false, // Karena kita handle CREATED_AT/UPDATED_AT manual
});

export default MenuModel;