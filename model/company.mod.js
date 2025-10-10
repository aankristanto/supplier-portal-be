import { DataTypes } from "sequelize";
import db from "../config/database.js";

const CompanyModel = db.define("xref_company", {
  ID: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false,
  },
  CODE: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  NAME: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ACTIVE: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  COMPANY_NAME: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  PHONE: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  FAX: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  WEB: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ADDRESS_1: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ADDRESS_2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  CITY: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  PROVINCE: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  POSTAL_CODE: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  COUNTRY_CODE: {
    type: DataTypes.CHAR(2),
    allowNull: true,
  },
  CONTACT_TITLE: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  CONTACT_NAME: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  CONTACT_POSITION: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  CONTACT_PHONE_1: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  CONTACT_PHONE_2: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  CONTACT_EMAIL: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  CLASS: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  PAYMENT_CURRENCY: {
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  PAYMENT_TERM_CODE: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  PAYMENT_REF: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ACCOUNT_BANK_NAME: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ACCOUNT_BANK_BRANCH: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ACCOUNT_BANK_COUNTRY_CODE: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ACCOUNT_BANK_CURRENCY_CODE: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  ACCOUNT_NAME: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ACCOUNT_NO: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ACCOUNT_SWIFT_CODE: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ACCOUNT_INSTRUCTION: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  REMITTANCE_TITLE: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  REMITTANCE_NAME: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  REMITTANCE_POSITION: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  REMITTANCE_PHONE_1: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  REMITTANCE_PHONE_2: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  REMITTANCE_EMAIL: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  SHIPPING_TERMS_CODE: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  DELIVERY_MODE_CODE: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  FOB_POINT_CODE: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  CREATED_ID: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  UPDATED_ID: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  UPDATED_AT: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'xref_company',
  timestamps: false, 
});

export default CompanyModel;