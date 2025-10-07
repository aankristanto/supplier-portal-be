import express from "express";
import db from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import { verifyToken } from "./middleware/auth.js";

const PORT = 5001;
const app = express();

const runDb = async () => {
  try {
    await db.authenticate();
    console.log("DB Connected");
  } catch (err) {
    console.log("Unable to connect to the database:", err);
  }
};

runDb();

app.use(express.json());


app.use("/auth", authRoutes);
app.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

app.use("/", (req, res) => {
  return res.status(200).json("Portal vendor PT Sumber Bintang rejeki running at " + new  Date())
})

app.listen(PORT, () => console.log(`Server Running on port: ${PORT} at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })}`));