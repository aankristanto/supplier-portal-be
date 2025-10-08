import express from "express";
import db from "./config/database.js";
import mainRoter from "./routes/main.route.js"
import cors from "cors"; 



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


app.use(cors({
  origin:  ["http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use("/api", mainRoter)
app.use("/", (req, res) => {
  return res.status(200).json("Portal vendor PT Sumber Bintang rejeki running at " + new  Date())
})

app.listen(PORT, () => console.log(`Server Running on port: ${PORT} at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })}`));