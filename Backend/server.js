import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

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

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM administrator");
  const finalResult = result.rows;
  console.log(finalResult);
  res.sendStatus(200).json(finalResult);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
