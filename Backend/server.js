import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors";

const app = express();
const PORT = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM administrator");
  const finalResult = result.rows;
  console.log(finalResult);
  res.sendStatus(200).json(finalResult);
});

app.post("/adminLogin", async (req, res) => {
  // console.log(req.body); // Log the request body to see what data is being received
  const { email, password } = req.body;
  try {
    const check = await db.query(
      "SELECT * FROM administrator WHERE email = $1 AND password = $2",
      [email, password]
    );
    // console.log(check.rows);
    if (check.rows.length > 0) {
      res.status(200).json([{ message: "Logged in successfully!" }]);
    } else {
      res.status(400).json([{ message: "Login unsuccessful!" }]);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json([{ message: "Internal server error" }]);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
