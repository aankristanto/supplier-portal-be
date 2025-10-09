import express from "express"
import { createGlobalPurchaseOrder } from "../controller/PurchaseOrder.js";
import { verifyTokenGlobal } from "../middleware/auth.js";

const router = express.Router();


router.use(verifyTokenGlobal)

router.post("/purchase-order", createGlobalPurchaseOrder)

export default router;