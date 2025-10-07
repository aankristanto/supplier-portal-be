import express from "express";
import { loginUser, registerUser, updatePassword, updateProfile } from "../controller/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", updateProfile);
router.put("/password", updatePassword);

export default router;