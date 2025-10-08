import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from "../controller/Company.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;