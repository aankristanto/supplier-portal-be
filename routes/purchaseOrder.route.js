import express from "express"
import { verifyToken } from "../middleware/auth.js"
import { createPurchaseOrder, createPurchaseOrderNote, createPurchaseOrderRev, deletePurchaseOrder, deletePurchaseOrderNote, deletePurchaseOrderRev, getAllPurchaseOrderNotes, getAllPurchaseOrderRevs, getAllPurchaseOrders, getPurchaseOrderById, getPurchaseOrderNoteById, getPurchaseOrderRevById, updatePurchaseOrder, updatePurchaseOrderNote, updatePurchaseOrderRev } from "../controller/PurchaseOrder.js"
import { createPurchaseOrderDetail, deletePurchaseOrderDetail, getAllPurchaseOrderDetails, getPurchaseOrderDetailById, updatePurchaseOrderDetail } from "../controller/PurchaseOrderDetail.js"

const router = express.Router()

router.use(verifyToken)

router.get("/main", getAllPurchaseOrders)
router.get("/main/:id", getPurchaseOrderById)
router.post("/main", createPurchaseOrder)
router.put("/main/:id", updatePurchaseOrder)
router.delete("/main/:id", deletePurchaseOrder)

router.get("/detail/", getAllPurchaseOrderDetails)
router.get("/detail/:id", getPurchaseOrderDetailById)
router.post("/detail/", createPurchaseOrderDetail)
router.put("/detail/:id", updatePurchaseOrderDetail)
router.delete("/detail/:id", deletePurchaseOrderDetail)

router.get("/note/", getAllPurchaseOrderNotes)
router.get("/note/:id", getPurchaseOrderNoteById)
router.post("/note/", createPurchaseOrderNote)
router.put("/note/:id", updatePurchaseOrderNote)
router.delete("/note/:id", deletePurchaseOrderNote)

router.get("/rev/", getAllPurchaseOrderRevs)
router.get("/rev/:id", getPurchaseOrderRevById)
router.post("/rev/", createPurchaseOrderRev)
router.put("/rev/:id", updatePurchaseOrderRev)
router.delete("/rev/:id", deletePurchaseOrderRev)

export default router;