import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteUserById, getAllUser, updateUser } from "../controller/User.js";

const router = express.Router();

router.get("/", verifyToken, getAllUser);
router.put("/:id", updateUser)
router.delete("/:id", deleteUserById)

export default router;