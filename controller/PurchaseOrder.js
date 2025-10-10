import PurchaseOrderModel, { PurchaseOrderNoteModel, PurchaseOrderRevModel } from "../model/purchaseOrder.mod.js";
import PurchaseOrderDetailModel from "../model/purchaseOrderDetail.mod.js";
import { updateStatusOrder } from "./api/summit.js";

export const getAllPurchaseOrders = async (req, res) => {
  const { MPO_STATUS } = req.query
  const userCompanyId = req.user.companyId;

  try {
    const orders = await PurchaseOrderModel.findAll({
      where: { VENDOR_ID: userCompanyId, MPO_STATUS },
    });
    res.status(200).json({ status: true, message: "Success get all pruchase order", data: orders });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const getPurchaseOrderById = async (req, res) => {
  const { id } = req.params;
  const userCompanyId = req.user.companyId;

  try {
    const order = await PurchaseOrderModel.findOne({
      where: { ID: id, VENDOR_ID: userCompanyId },
    });

    if (!order) return res.status(404).json({ status: false, message: "Purchase order not found" });


    const orderNote = await PurchaseOrderNoteModel.findOne({
      where: {
        PURCHASE_ORDER_ID: order.ID,
        REV_ID: order.REV_ID
      }
    })

    if (!orderNote) return res.status(404).json({ status: false, message: "Purchase order note not found" });

    res.status(200).json({ status: true, message: "Success get purchase by id", data: { ...order.dataValues, ...orderNote.dataValues, VENDOR_DETAIL: JSON.parse(order.VENDOR_DETAIL), INVOICE_DETAIL: JSON.parse(order.INVOICE_DETAIL) } });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const createPurchaseOrder = async (req, res) => {
  const { ID, ...otherFields } = req.body;
  const userCompanyId = req.user.companyId;
  const userId = req.user.id;

  try {
    await PurchaseOrderModel.create({
      ID,
      ...otherFields,
      VENDOR_ID: userCompanyId,
      UPDATED_ID: userId,
      UPDATED_AT: new Date(),
    });

    res.status(201).json({ status: true, message: "Success create purchase order" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const updatePurchaseOrder = async (req, res) => {
  const { id } = req.params;
  const userCompanyId = req.user.companyId;
  const userId = req.user.id;
  const body = req.body

  try {
    const purchaseOrder = await PurchaseOrderModel.findOne({ where: { ID: id, VENDOR_ID: userCompanyId } })
    if (!purchaseOrder) {
      return res.status(404).json({ status: false, message: "Purchase order not found or not authorized" });
    }

    if (body?.MPO_STATUS) {
      await updateStatusOrder(purchaseOrder.ID,purchaseOrder.REV_SPM_ID, {
        SUPPLIER_STATUS: body?.MPO_STATUS
      })
    }

    await purchaseOrder.update(
      {
        ...body,
        UPDATED_ID: userId,
        UPDATED_AT: new Date(),
      }
    );

    res.status(200).json({ status: true, message: "Success update purchase order" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const deletePurchaseOrder = async (req, res) => {
  const { id } = req.params;
  const userCompanyId = req.user.companyId;

  try {
    const deletedRowsCount = await PurchaseOrderModel.destroy({
      where: { ID: id, VENDOR_ID: userCompanyId },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ status: false, message: "Purchase order not found or not authorized" });
    }

    res.status(200).json({ status: true, message: "Success delete purchase order" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const getAllPurchaseOrderNotes = async (req, res) => {
  const { PURCHASE_ORDER_ID } = req.query

  const where = {
    VENDOR_ID: req.user.companyId
  }

  if (PURCHASE_ORDER_ID) {
    where.PURCHASE_ORDER_ID = PURCHASE_ORDER_ID
  }

  try {
    const notes = await PurchaseOrderNoteModel.findAll({ where });
    res.status(200).json({ status: true, message: "Success get all purchase order note", data: notes });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const getPurchaseOrderNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await PurchaseOrderNoteModel.findByPk(id);
    if (!note) {
      return res.status(404).json({ status: false, message: "Purchase order note not found" });
    }
    res.status(200).json({ status: true, message: "Success get purchase order note", data: note });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const createPurchaseOrderNote = async (req, res) => {
  const { ...otherFields } = req.body;
  const userId = req.user?.id

  try {
    await PurchaseOrderNoteModel.create({
      ...otherFields,
      UPDATED_ID: userId,
      UPDATED_AT: new Date(),
    });

    res.status(201).json({ status: true, message: "Scucess create purchase order note" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const updatePurchaseOrderNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const [updatedRowsCount] = await PurchaseOrderNoteModel.update(
      {
        ...req.body,
        UPDATED_ID: userId,
        UPDATED_AT: new Date(),
      },
      { where: { ID: id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ status: false, message: "Purchase order note not found" });
    }

    res.status(200).json({ status: true, message: "Success update purchase order note" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const deletePurchaseOrderNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRowsCount = await PurchaseOrderNoteModel.destroy({ where: { ID: id } });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ status: false, message: "Purchase order note not found" });
    }

    res.status(200).json({ status: true, message: "Success create purchase order note" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const getAllPurchaseOrderRevs = async (req, res) => {
  const { PURCHASE_ORDER_ID } = req.query

  const where = {}

  if (PURCHASE_ORDER_ID) {
    where.PURCHASE_ORDER_ID = PURCHASE_ORDER_ID
  }

  try {
    const revs = await PurchaseOrderRevModel.findAll({ where });
    res.status(200).json({ status: true, message: "Success get all purchase order rev", data: revs });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const getPurchaseOrderRevById = async (req, res) => {
  const { id } = req.params;
  try {
    const rev = await PurchaseOrderRevModel.findByPk(id);
    if (!rev) {
      return res.status(404).json({ status: false, message: "Purchase order revision not found" });
    }
    res.status(200).json({ status: true, message: "Success get by id purchase order rev", data: rev });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const createPurchaseOrderRev = async (req, res) => {
  const { ...otherFields } = req.body;
  const userId = req.user?.id

  try {
    await PurchaseOrderRevModel.create({
      ...otherFields,
      CREATED_SUMMIT_ID: userId,
    });

    res.status(201).json({ status: true, message: "Success create purchase order rev" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const updatePurchaseOrderRev = async (req, res) => {
  const { id } = req.params;

  try {
    const [updatedRowsCount] = await PurchaseOrderRevModel.update(
      {
        ...req.body,
      },
      { where: { ID: id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ status: false, message: "Purchase order revision not found" });
    }


    res.status(201).json({ status: true, message: "Success update purchase order rev" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const deletePurchaseOrderRev = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRowsCount = await PurchaseOrderRevModel.destroy({ where: { ID: id } });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ status: false, message: "Purchase order revision not found" });
    }

    res.status(200).json({ status: true, message: "Success delete purchase order rev" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const createGlobalPurchaseOrder = async (req, res) => {
  const { PURCHASE_ORDER, PURCHASE_ORDER_NOTE, PURCHASE_LIST, PURCHASE_REV } = req.body
  if (!PURCHASE_ORDER || !PURCHASE_ORDER_NOTE || !PURCHASE_LIST) return res.status(400).json({ status: false, message: "All field are required" });

  const PURCHASE_ORDER_ID = PURCHASE_ORDER?.MPO_ID
  let REV_ID = 0

  if (!PURCHASE_ORDER_ID) return res.status(400).json({ status: false, message: "Purchase order id is required" });

  if (!Array.isArray(PURCHASE_LIST)) {
    return res.status(400).json({ status: false, message: "Purchase order list must be array" });
  }

  try {
    const purchaseOrder = await PurchaseOrderModel.findOne({
      where: {
        ID: PURCHASE_ORDER_ID,
        REV_SPM_ID: PURCHASE_ORDER?.REV_ID,
      }
    })

    if (purchaseOrder) return res.status(400).json({ status: false, message: "Purchase order already exists" })




    if (PURCHASE_REV) {
      const revCount = await PurchaseOrderRevModel.count({
        where: {
          PURCHASE_ORDER_ID
        }
      })
      const createRev = await PurchaseOrderRevModel.create({
        NAME: PURCHASE_REV?.NAME,
        DESCRIPTION: PURCHASE_REV?.DESCRIPTION,
        SEQUENCE: revCount,
        CREATED_SUMMIT_ID: PURCHASE_REV?.CREATED_ID,
        PURCHASE_ORDER_ID
      })
      REV_ID = createRev.ID
    }

    const purchaseUpdate = await PurchaseOrderModel.findByPk(PURCHASE_ORDER_ID)
    if (purchaseUpdate) {
      await purchaseUpdate.update({
        REV_ID,
        REV_SPM_ID: PURCHASE_ORDER?.REV_ID,
        MPO_DATE: PURCHASE_ORDER?.MPO_DATE,
        VENDOR_ID: PURCHASE_ORDER?.VENDOR_ID,
        VENDOR_DETAIL: PURCHASE_ORDER?.VENDOR_DETAIL,
        INVOICE_DETAIL: PURCHASE_ORDER?.INVOICE_DETAIL,
        VENDOR_SHIPPER_LOCATION_ID: PURCHASE_ORDER?.VENDOR_SHIPPER_LOCATION_ID,
        COMPANY_ID: PURCHASE_ORDER?.COMPANY_ID,
        INVOICE_UNIT_ID: PURCHASE_ORDER?.INVOICE_UNIT_ID,
        DELIVERY_UNIT_ID: PURCHASE_ORDER?.DELIVERY_UNIT_ID,
        CURRENCY_CODE: PURCHASE_ORDER?.CURRENCY_CODE,
        SURCHARGE_AMOUNT: PURCHASE_ORDER?.SURCHARGE_AMOUNT,
        TAX_PERCENTAGE: PURCHASE_ORDER?.TAX_PERCENTAGE,
        CREATED_SUMMIT_ID: PURCHASE_ORDER?.CREATED_ID,
        UPDATED_ID: null,
        UPDATED_AT: new Date(),
        MPO_STATUS: 'Open'
      })
    }
    await PurchaseOrderModel.create({
      ID: PURCHASE_ORDER_ID,
      REV_ID,
      REV_SPM_ID: PURCHASE_ORDER?.REV_ID,
      MPO_DATE: PURCHASE_ORDER?.MPO_DATE,
      VENDOR_ID: PURCHASE_ORDER?.VENDOR_ID,
      VENDOR_DETAIL: PURCHASE_ORDER?.VENDOR_DETAIL,
      INVOICE_DETAIL: PURCHASE_ORDER?.INVOICE_DETAIL,
      VENDOR_SHIPPER_LOCATION_ID: PURCHASE_ORDER?.VENDOR_SHIPPER_LOCATION_ID,
      COMPANY_ID: PURCHASE_ORDER?.COMPANY_ID,
      INVOICE_UNIT_ID: PURCHASE_ORDER?.INVOICE_UNIT_ID,
      DELIVERY_UNIT_ID: PURCHASE_ORDER?.DELIVERY_UNIT_ID,
      CURRENCY_CODE: PURCHASE_ORDER?.CURRENCY_CODE,
      SURCHARGE_AMOUNT: PURCHASE_ORDER?.SURCHARGE_AMOUNT,
      TAX_PERCENTAGE: PURCHASE_ORDER?.TAX_PERCENTAGE,
      CREATED_SUMMIT_ID: PURCHASE_ORDER?.CREATED_ID,
      UPDATED_ID: null,
      UPDATED_AT: null,
      MPO_STATUS: 'Open'
    })

    await PurchaseOrderNoteModel.create({
      REV_ID,
      MPO_ETD: PURCHASE_ORDER_NOTE?.MPO_ETD,
      MPO_ETA: PURCHASE_ORDER_NOTE?.MPO_ETA,
      DELIVERY_MODE_CODE: PURCHASE_ORDER_NOTE?.DELIVERY_MODE_CODE,
      DELIVERY_TERM: PURCHASE_ORDER_NOTE?.DELIVERY_TERM,
      COUNTRY_ID: PURCHASE_ORDER_NOTE?.COUNTRY_ID,
      PORT_DISCHARGE: PURCHASE_ORDER_NOTE?.PORT_DISCHARGE,
      DELIVERY_UNIT_ID: PURCHASE_ORDER_NOTE?.DELIVERY_UNIT_ID,
      DELIVERY_UNIT: PURCHASE_ORDER_NOTE?.DELIVERY_UNIT,
      WAREHOUSE_ID: PURCHASE_ORDER_NOTE?.WAREHOUSE_ID,
      WAREHOUSE_NAME: PURCHASE_ORDER_NOTE?.WAREHOUSE_NAME,
      PAYMENT_TERM_ID: PURCHASE_ORDER_NOTE?.PAYMENT_TERM_ID,
      PAYMENT_TERM_NAME: PURCHASE_ORDER_NOTE?.PAYMENT_TERM_NAME,
      PAYMENT_REFERENCE: PURCHASE_ORDER_NOTE?.PAYMENT_REFERENCE,
      NOTE: PURCHASE_ORDER_NOTE?.NOTE,
      CREATED_SUMMIT_ID: PURCHASE_ORDER_NOTE?.CREATED_ID,
      UPDATED_AT: null,
      UPDATED_ID: null,
      PURCHASE_ORDER_ID
    })

    for (let i = 0; i < PURCHASE_LIST.length; i++) {
      const item = PURCHASE_LIST[i];
      await PurchaseOrderDetailModel.create({
        PURCHASE_ORDER_ID,
        REV_ID,
        BOM_STRUCTURE_LINE_ID: item?.BOM_STRUCTURE_LINE_ID,
        ITEM_DIMENSION_ID: item?.ITEM_DIMENSION_ID,

        STOCK_HOLDING_CO: item?.STOCK_HOLDING_CO,
        CUSTOMER_NAME: item?.CUSTOMER_NAME,
        CUSTOMER_SEASON: item?.CUSTOMER_SEASON,
        CUSTOMER_DIVISION: item?.CUSTOMER_DIVISION,
        ORDER_CODE: item?.ORDER_CODE,
        ORDER_TYPE: item?.ORDER_TYPE,
        ORDER_DESCRIPTION: item?.ORDER_DESCRIPTION,
        ORDER_REF_PO_NO: item?.ORDER_REF_PO_NO,
        BOM_ID: item?.BOM_ID,
        BOM_LINE_ID: item?.BOM_LINE_ID,
        MATERIAL_ITEM_ID: item?.MATERIAL_ITEM_ID,
        ITEM_CODE_DESCRIPTION: item?.ITEM_CODE_DESCRIPTION,
        ITEM_TYPE_CODE: item?.ITEM_TYPE_CODE,
        ITEM_CATEGORY: item?.ITEM_CATEGORY,
        MATERIAL_ITEM_DIM_ID: item?.MATERIAL_ITEM_DIM_ID,
        MATERIAL_ITEM_COLOR: item?.MATERIAL_ITEM_COLOR,
        MATERIAL_ITEM_SIZE: item?.MATERIAL_ITEM_SIZE,
        MATERIAL_ITEM_SERIAL_NO: item?.MATERIAL_ITEM_SERIAL_NO,
        PURCHASE_UOM: item?.PURCHASE_UOM,

        PURCHASE_ORDER_QTY: item?.PURCHASE_ORDER_QTY,
        UNIT_COST: item?.UNIT_COST,
        FINANCE_COST: item?.FINANCE_COST,
        FREIGHT_COST: item?.FREIGHT_COST,
        OTHER_COST: item?.OTHER_COST,
        TOTAL_UNIT_COST: item?.TOTAL_UNIT_COST,
        TOTAL_PURCHASE_COST: item?.TOTAL_PURCHASE_COST,
        CREATED_SUMMIT_ID: item?.CREATE_BY,
        UPDATED_ID: null,
        UPDATED_AT: null
      })
    }

    res.status(200).json({ status: true, message: "Success create global purchase order" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}