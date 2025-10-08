import express from "express";
import authRoute from "./auth.route.js";
import companyRoute from "./company.route.js"

const router = express.Router();

router.use("/auth", authRoute);
router.use("/company", companyRoute)


export default router;