import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors";

const app = express();
const PORT = 3000;
env.config();

// postgresql configuration
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Solespace!" });
});

// Authentication of Admin
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
      res.status(200).json({ message: "Logged in successfully!" });
    } else {
      res.status(400).json({ message: "Login unsuccessful!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Customer GET route on Admin side
app.get("/customers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customers");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

app.get("/allProducts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

// Customer signup POST route
app.post("/signup", async (req, res) => {
  const { name, email, phone, address, password } = req.body;
  // console.log(req.body);
  try {
    const checkAvailability = await db.query(
      "SELECT * FROM customers WHERE email = $1",
      [email]
    );
    if (checkAvailability.rows.length > 0) {
      res.status(400).json({
        message:
          "User with same email address already exists! Try using different email address",
      });
    } else {
      const result = await db.query(
        "INSERT INTO customers (name, email, phone, address, password) VALUES ($1, $2, $3, $4, $5);",
        [name, email, phone, address, password]
      );
      res.status(200).json({ message: "You are signed up, please log in!" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
