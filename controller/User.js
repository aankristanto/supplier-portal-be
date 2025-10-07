import UserModel from "../model/user.mod.js";
import { hashPassword } from "../utils/crypto.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { INITIAL, PASSWORD, NAME, EMAIL, NO_TELEPHONE, COMPANY_ID, ADDRESS, POSITION, LEVEL, SUMMARY, USER_PATH } = req.body;

    if (!INITIAL || !PASSWORD || !NAME || !EMAIL || !NO_TELEPHONE || !COMPANY_ID) {
        return res.status(400).json({ status: false, message: "All filed are required" });
    }

    try {
        const hashedPassword = hashPassword(PASSWORD);

        await UserModel.create({
            INITIAL,
            PASSWORD: hashedPassword,
            NAME,
            EMAIL,
            NO_TELEPHONE,
            COMPANY_ID,
            ADDRESS,
            POSITION,
            LEVEL,
            SUMMARY,
            USER_PATH,
        });

        res.status(201).json({ status: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const loginUser = async (req, res) => {
    const { EMAIL, PASSWORD } = req.body;

    if (!EMAIL) {
        return res.status(400).json({ status: false, message: "Email are required" });
    }

    if (!PASSWORD) {
        return res.status(400).json({ status: false, message: "Password are required" });
    }

    try {
        const user = await UserModel.findOne({ where: { EMAIL } });
        if (!user) {
            return res.status(401).json({ status: false, message: "Invalid email or password" });
        }

        const hashedPassword = hashPassword(PASSWORD);
        if (user.PASSWORD !== hashedPassword) {
            return res.status(401).json({ status: false, message: "Invalid email or password" });
        }

        const accessToken = jwt.sign(
            { id: user.ID, email: user.EMAIL },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: user.ID, email: user.EMAIL },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        user.REF_TOKEN = refreshToken;
        await user.save();

        res.status(200).json({ status: true, message: "Success login", data: { accessToken, refreshToken } });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const updateProfile = async (req, res) => {
    const { ID, INITIAL, NAME, EMAIL, NO_TELEPHONE, COMPANY_ID, ADDRESS, POSITION, LEVEL, SUMMARY, USER_PATH } = req.body;

    if (!INITIAL || !NAME || !EMAIL || !NO_TELEPHONE || !COMPANY_ID) {
        return res.status(400).json({ status: false, message: "All filed are required" });
    }

    try {
        const user = await UserModel.findByPk(ID);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        await user.update({
            NAME,
            INITIAL,
            EMAIL,
            NO_TELEPHONE,
            COMPANY_ID,
            ADDRESS,
            POSITION,
            LEVEL,
            SUMMARY,
            USER_PATH,
        });

        res.status(200).json({ status: true, message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const updatePassword = async (req, res) => {
    const { ID, CURRENT_PASSWORD, NEW_PASSWORD, CONFIRM_PASSWORD } = req.body;

    if (!ID || !CURRENT_PASSWORD || !NEW_PASSWORD || !CONFIRM_PASSWORD) {
        return res.status(404).json({ status: false, message: "All field are required" });   
    }

    try {
        const user = await UserModel.findByPk(ID);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const hashedCurrentPassword = hashPassword(CURRENT_PASSWORD);
        if (user.PASSWORD !== hashedCurrentPassword) {
            return res.status(401).json({ status: false, message: "Current password is incorrect" });
        }

        if (NEW_PASSWORD !== CONFIRM_PASSWORD) {
            return res.status(400).json({ status: false, message: "New password and confirm password do not match" });
        }

        const hashedNewPassword = hashPassword(NEW_PASSWORD);
        await user.update({ PASSWORD: hashedNewPassword });

        res.status(200).json({ status: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};