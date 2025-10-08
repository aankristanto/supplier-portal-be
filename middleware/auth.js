import jwt from "jsonwebtoken";
import UserModel from "../model/user.mod.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const autorize = authHeader && authHeader.split(" ")[0];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token || autorize !== "Bearer") {
    return res.status(401).json({ status: false, message: "Access token required" });
  }
  try {
    const user = await UserModel.findOne({ where: { TOKEN: token } });
    if (!user || !user.REF_TOKEN) return res.status(403).json({ status: false, message: "Access Denied" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        jwt.verify(user.REF_TOKEN, process.env.REFRESH_TOKEN_SECRET, async (refreshErr, refreshDecoded) => {
            if (refreshErr) {
              await user.update({ REF_TOKEN: null });
              return res.status(403).json({ status: false, message: "Access Denied" });
            }
            const newAccessToken = jwt.sign(
              { id: user.ID, email: user.EMAIL, COMPANY_ID: user.COMPANY_ID },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "15m" }
            );
            await user.update({ TOKEN: newAccessToken });
            res.set("X-New-Access-Token", newAccessToken);
            req.user = refreshDecoded;
            next();
          });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Something when wrong", error: err.message });
  }
};