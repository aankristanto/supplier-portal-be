import PurchaseOrderDetailModel from "../model/purchaseOrderDetail.mod.js";

export const getAllPurchaseOrderDetails = async (req, res) => {
    const {PURCHASE_ORDER_ID} = req.query

    const where = {}
    if (PURCHASE_ORDER_ID) {
        where.PURCHASE_ORDER_ID = PURCHASE_ORDER_ID
    }

  try {
    const details = await PurchaseOrderDetailModel.findAll({where});

    res.status(200).json({status: true, message: "Success get all purchase detail", data: details});
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const getPurchaseOrderDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await PurchaseOrderDetailModel.findByPk(id);
    if (!detail) return res.status(404).json({ status: false, message: "Purchase order detail not found" });

    res.status(200).json({status: true, message: "Success get by id purchase detail", data:detail});
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const createPurchaseOrderDetail = async (req, res) => {
  const { ...otherFields } = req.body;
  const userId = req.user?.id; 

  try {
    await PurchaseOrderDetailModel.create({
      ...otherFields,
      UPDATED_ID: userId,
      UPDATED_AT: new Date(),
    });

    res.status(201).json({status: true, message: "Success create purchase detail"});
  } catch (err) {
    res.status(400).json({ status: false, message:  err.message });
  }
};


export const updatePurchaseOrderDetail = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id; 

  try {
    const [updatedRowsCount] = await PurchaseOrderDetailModel.update(
      {
        ...req.body,
        UPDATED_ID: userId,
        UPDATED_AT: new Date(),
      },
      { where: { ID: id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ status: false,  message: "Purchase order detail not found" });
    }

    res.status(200).json({status: true, message: "Success update purchase detail"});
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const deletePurchaseOrderDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRowsCount = await PurchaseOrderDetailModel.destroy({ where: { ID: id } });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: "Purchase order detail not found" });
    }

    res.status(200).json({status: true, message: "Success delete purchase detail"});
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to fetch data", data: err.message });
  }
};