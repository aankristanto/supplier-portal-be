
import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const PurchaseOrderDetailModel = db.define("purchase_order_detail", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  PURCHASE_ORDER_ID: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  REV_ID: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  BOM_STRUCTURE_LINE_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ITEM_DIMENSION_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  STOCK_HOLDING_CO: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  CUSTOMER_NAME: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  CUSTOMER_SEASON: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  CUSTOMER_DIVISION: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ORDER_CODE: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ORDER_TYPE: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ORDER_DESCRIPTION: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ORDER_REF_PO_NO: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  BOM_ID: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  BOM_LINE_ID: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  MATERIAL_ITEM_ID: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ITEM_CODE_DESCRIPTION: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ITEM_TYPE_CODE: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ITEM_CATEGORY: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  MATERIAL_ITEM_DIM_ID: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  MATERIAL_ITEM_COLOR: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  MATERIAL_ITEM_SIZE: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  MATERIAL_ITEM_SERIAL_NO: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  PURCHASE_UOM: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  PURCHASE_ORDER_QTY: {
    type: DataTypes.DECIMAL(60, 2),
    allowNull: true,
  },
  UNIT_COST: {
    type: DataTypes.DECIMAL(60, 6),
    allowNull: true,
  },
  FINANCE_COST: {
    type: DataTypes.DECIMAL(60, 2),
    allowNull: true,
  },
  FREIGHT_COST: {
    type: DataTypes.DECIMAL(60, 2),
    allowNull: true,
  },
  OTHER_COST: {
    type: DataTypes.DECIMAL(60, 2),
    allowNull: true,
  },
  TOTAL_UNIT_COST: {
    type: DataTypes.DECIMAL(60, 2),
    allowNull: true,
  },
  TOTAL_PURCHASE_COST: {
    type: DataTypes.DECIMAL(60, 2),
    allowNull: true,
  },
  CREATED_SUMMIT_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  UPDATED_ID: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  UPDATED_AT: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'purchase_order_detail',
  timestamps: false, 
});

export default PurchaseOrderDetailModel;