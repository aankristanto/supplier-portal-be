import express from "express";
import db from "./config/database.js";
import mainRoter from "./routes/main.route.js"
import cors from "cors"; 

const app = express();
const cros = cors({
  origin:  ["http://localhost:3000", "http://localhost:3001"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
})

const runDb = async () => {
  try {
    await db.authenticate();
    console.log("DB Connected");
  } catch (err) {
    console.log("Unable to connect to the database:", err);
  }
};
runDb();


app.use(cros);
app.use(express.json());


// app.use("/", (req, res) => {
//   return res.status(200).json("Portal vendor PT Sumber Bintang rejeki running at " + new  Date())
// })

app.use("/api", mainRoter)

app.use((req, res) => {
  res.status(404).json({ status: false, message: "Route not found" });
});

const PORT = 5004;
app.listen(PORT, () => console.log(`Server Running on port: ${PORT} at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })}`));