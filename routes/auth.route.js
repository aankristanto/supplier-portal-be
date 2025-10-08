import express from "express";
import { fetchProfileByToken, loginUser, registerUser, updatePassword, updateProfile } from "../controller/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, fetchProfileByToken)
router.put("/profile", verifyToken, updateProfile);
router.put("/password", verifyToken, updatePassword);

export default router;