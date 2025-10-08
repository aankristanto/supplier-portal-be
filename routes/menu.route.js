import express from "express"
import { verifyToken } from "../middleware/auth.js";
import { createMenu, deleteMenu, getAllMenus, getMenuById, updateMenu } from "../controller/Menu.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getAllMenus);
router.get("/:id", getMenuById);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;