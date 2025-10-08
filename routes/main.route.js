import express from "express";
import authRoute from "./auth.route.js";
import companyRoute from "./company.route.js"
import userRoute from "./user.route.js"
import menuRoutes from "./menu.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/company", companyRoute)
router.use("/user", userRoute)
router.use("/menu", menuRoutes)

export default router;