import express from "express"
import { createGlobalPurchaseOrder } from "../controller/PurchaseOrder.js";
import { verifyTokenGlobal } from "../middleware/auth.js";
import { globalManipulationCompany } from "../controller/Company.js";

const router = express.Router();

router.use(verifyTokenGlobal)
router.post("/purchase-order", createGlobalPurchaseOrder)
router.post("/vendor-detail", globalManipulationCompany)

export default router;