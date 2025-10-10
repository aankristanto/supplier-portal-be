import jwt from "jsonwebtoken";
import UserModel from "../model/user.mod.js";
import PublicTokenModel from "../model/publicToken.mod.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const autorize = authHeader && authHeader.split(" ")[0];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token || autorize !== "Bearer") {
    return res.status(401).json({ status: false, message: "Access Denied" });
  }
  try {
    const user = await UserModel.findOne({ where: { TOKEN: token } });
    if (!user || !user.REF_TOKEN) return res.status(403).json({ status: false, message: "Access Denied" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (!err) {
        req.user = decoded;
        next();
      } else {
        jwt.verify(user.REF_TOKEN, process.env.REFRESH_TOKEN_SECRET, async (refreshErr, refreshDecoded) => {
          if (refreshErr) {
            await user.update({ REF_TOKEN: null });
            return res.status(403).json({ status: false, message: "Access Denied" });
          }
          const newAccessToken = jwt.sign(
            { id: user.ID, email: user.EMAIL, companyId: user.COMPANY_ID },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          await user.update({ TOKEN: newAccessToken });
          res.set("X-New-Access-Token", newAccessToken);
          res.set("Access-Control-Expose-Headers", "X-New-Access-Token");
          req.user = refreshDecoded;
          next();
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Something when wrong", error: err.message });
  }
};


export const verifyTokenGlobal =  async (req, res, next) => {
  const authHeader = req.headers["x-token-access"];

  const autorize = authHeader && authHeader.split(" ")[0];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "Access Denied" });
  }

  try {
    const publicToken = await PublicTokenModel.findOne({where: {
      SIGNATURE_CODE: autorize,
      TOKEN: token
    }})

  if (!publicToken) return res.status(401).json({ status: false, message: "Access Denied" });


  if (publicToken.EXPIRED_DATE) {
    if (EXPIRED_DATE > new Date()) return res.status(401).json({ status: false, message: "Token is expired, please contact your administration" });
  }
        
    next();
  } catch (err) {
    return res.status(500).json({ status: false, message: "Something when wrong", error: err.message });
  }
};