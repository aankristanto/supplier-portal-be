import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PurchaseOrderModel = db.define("purchase_order", {
  ID: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  REV_ID: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  REV_SPM_ID: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  MPO_DATE: {
    type: DataTypes.DATEONLY, 
    allowNull: true,
  },
  VENDOR_ID: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  VENDOR_DETAIL: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  INVOICE_DETAIL: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  VENDOR_SHIPPER_LOCATION_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  COMPANY_ID: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  INVOICE_UNIT_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  DELIVERY_UNIT_ID: {
    type: DataTypes.STRING(1),
    defaultValue: '1',
    allowNull: true,
  },
  CURRENCY_CODE: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  SURCHARGE_AMOUNT: {
    type: DataTypes.DECIMAL(60, 6),
    defaultValue: 0.000000,
    allowNull: true,
  },
  TAX_PERCENTAGE: {
    type: DataTypes.DECIMAL(60, 2),
    defaultValue: 0.00,
    allowNull: true,
  },
  CREATED_SUMMIT_ID: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  UPDATED_ID: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  UPDATED_AT: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  MPO_STATUS: {
    type: DataTypes.ENUM('Open', 'Accept', 'Process', 'Done'),
    allowNull: true,
  },
}, {
  tableName: 'purchase_order',
  timestamps: false, 
});

export const PurchaseOrderNoteModel = db.define("purchase_order_notes", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  REV_ID: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  MPO_ETD: {
    type: DataTypes.DATEONLY, 
    allowNull: true,
  },
  MPO_ETA: {
    type: DataTypes.DATEONLY, 
    allowNull: true,
  },
  DELIVERY_MODE_CODE: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  DELIVERY_TERM: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  COUNTRY_ID: {
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  PORT_DISCHARGE: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  DELIVERY_UNIT_ID: {
    type: DataTypes.STRING(2),
    defaultValue: '1',
    allowNull: true,
  },
  DELIVERY_UNIT: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  WAREHOUSE_ID: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  WAREHOUSE_NAME: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  PAYMENT_TERM_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  PAYMENT_TERM_NAME: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  PAYMENT_REFERENCE: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  NOTE: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  CREATED_SUMMIT_ID: {
    type: DataTypes.INTEGER,
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
  PURCHASE_ORDER_ID: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'purchase_order_notes',
  timestamps: false,
});


export const PurchaseOrderRevModel = db.define("purchase_order_rev", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  NAME: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  DESCRIPTION: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  SEQUENCE: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  CREATED_SUMMIT_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  PURCHASE_ORDER_ID: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'purchase_order_rev',
  timestamps: false, 
});

export default PurchaseOrderModel;