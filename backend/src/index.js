import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";
import bodyParser from "body-parser";
import authRoutes from "../routes/auth.route.js";
import cors from "cors";

dotenv.config();
const app = express();


export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth",
});



db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + db.threadId);
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello from Node.js server!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
