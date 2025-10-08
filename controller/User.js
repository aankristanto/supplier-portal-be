import { Op } from "sequelize";
import UserModel from "../model/user.mod.js";
import { hashPassword } from "../utils/crypto.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { INITIAL, PASSWORD, NAME, GENDER, EMAIL, NO_TELEPHONE, COMPANY_ID, ADDRESS, POSITION, LEVEL, SUMMARY, USER_PATH } = req.body;

    if (!INITIAL || !PASSWORD || !NAME || !EMAIL || !NO_TELEPHONE || !COMPANY_ID) {
        return res.status(400).json({ status: false, message: "All filed are required" });
    }

    try {
        const alreadyEmail = await UserModel.findOne({where: {
            EMAIL
        }})

        if (alreadyEmail) return res.status(400).json({ status: false, message: "Email already used" });

        const hashedPassword = hashPassword(PASSWORD);
        await UserModel.create({
            INITIAL,
            PASSWORD: hashedPassword,
            GENDER,
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

    if (!EMAIL) return res.status(400).json({ status: false, message: "Email are required" });
    if (!PASSWORD) return res.status(400).json({ status: false, message: "Password are required" });

    try {
        const user = await UserModel.findOne({ where: { EMAIL } });
        if (!user) return res.status(400).json({ status: false, message: "Invalid email or password" });

        const hashedPassword = hashPassword(PASSWORD);
        if (user.PASSWORD !== hashedPassword) return res.status(400).json({ status: false, message: "Invalid email or password" });

        const accessToken = jwt.sign(
            { id: user.ID, email: user.EMAIL, companyId: user.COMPANY_ID },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: user.ID, email: user.EMAIL, companyId: user.COMPANY_ID },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        await user.update({
            IS_LOGGINED: true,
            TOKEN: accessToken,
            REF_TOKEN: refreshToken
        });

        res.status(200).json({ status: true, message: "Success login", data: { accessToken, refreshToken } });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const fetchProfileByToken = async (req, res) =>{
    const userId = req.user.id
    try {
        const user = await UserModel.findByPk(userId)    
        if (!user) return res.status(404).json({ status: false, message: "User not found" });

        res.status(200).json({status: true, message: "Success get profile", data: user})
    } catch (err) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { INITIAL, NAME, EMAIL, NO_TELEPHONE, GENDER, COMPANY_ID, ADDRESS, POSITION, LEVEL, SUMMARY, USER_PATH } = req.body;
    const userId = req.user.id

    if (!INITIAL || !NAME || !EMAIL || !NO_TELEPHONE || !COMPANY_ID) {
        return res.status(400).json({ status: false, message: "All filed are required" });
    }

    try {
        const user = await UserModel.findByPk(userId);
        if (!user) return res.status(404).json({ status: false, message: "User not found" });

        const alreadyEmail = await UserModel.findOne({
            where: {
                EMAIL,
                ID: {[Op.ne]: userId}
            }
        })

        if (alreadyEmail) return res.status(400).json({ status: false, message: "Email already used" });
        await user.update({
            NAME,
            INITIAL,
            EMAIL,
            NO_TELEPHONE,
            COMPANY_ID,
            ADDRESS,
            GENDER,
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
    const { CURRENT_PASSWORD, NEW_PASSWORD, CONFIRM_PASSWORD } = req.body;
    const userId = req.user.id


    if ( !CURRENT_PASSWORD || !NEW_PASSWORD || !CONFIRM_PASSWORD) {
        return res.status(404).json({ status: false, message: "All field are required" });   
    }

    try {
        const user = await UserModel.findByPk(userId);
        if (!user) return res.status(404).json({ status: false, message: "User not found" });

        const hashedCurrentPassword = hashPassword(CURRENT_PASSWORD);
        if (user.PASSWORD !== hashedCurrentPassword) {
            return res.status(400).json({ status: false, message: "Current password is incorrect" });
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