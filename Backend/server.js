import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import multer from "multer";

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
    // console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

app.get("/allProducts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    // console.log(result.rows);
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCheck = await db.query(
      "SELECT * FROM customers WHERE email = $1",
      [email]
    );
    // console.log(result.rows);
    if (userCheck.rows.length > 0) {
      const result = await db.query(
        "SELECT * FROM customers WHERE email = $1 AND password = $2",
        [email, password]
      );
      if (result.rows.length > 0) {
        res.status(200).json({
          message: "You have successfully logged in!",
          userData: result.rows[0],
        });
      } else {
        res
          .status(400)
          .json({ message: "Login unsuccessful! Incorrect password." });
      }
    } else {
      res.status(400).json({ message: "Login unsuccessful! User not found." });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// POST route to add product from admin panel
app.post("/addProduct", async (req, res) => {
  const {
    name,
    brand,
    description,
    original_price,
    current_price,
    category,
    gender,
    stock_quantity,
  } = req.body;
  try {
    const check = await db.query("SELECT * FROM products WHERE name = $1", [
      name,
    ]);
    if (check.rows.length > 0) {
      res.status(400).json({
        message:
          "User with same email address already exists! Try using different email address",
      });
    } else {
      const result = await db.query(
        "INSERT INTO products (name, brand, description, original_price, current_price, category, gender, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [
          name,
          brand,
          description,
          original_price,
          current_price,
          category,
          gender,
          stock_quantity,
        ]
      );
      res.status(200).json({ id: result.rows[0].id });
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(400);
  }
});

// POST route to upload images of products
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to upload images of products
app.post(
  "/uploadImages",
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "left_view", maxCount: 1 },
    { name: "right_view", maxCount: 1 },
    { name: "top_view", maxCount: 1 },
    { name: "bottom_view", maxCount: 1 },
  ]),
  async (req, res) => {
    const { productId } = req.body;
    try {
      const result = await db.query(
        "INSERT INTO products_images (product_id, main, left_view, right_view, top_view, bottom_view) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          productId,
          req.files.main ? req.files.main[0].buffer : null,
          req.files.left_view ? req.files.left_view[0].buffer : null,
          req.files.right_view ? req.files.right_view[0].buffer : null,
          req.files.top_view ? req.files.top_view[0].buffer : null,
          req.files.bottom_view ? req.files.bottom_view[0].buffer : null,
        ]
      );
      res.status(201).json({ message: "Images uploaded successfully" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal server error" });
    }
    // console.log(req.files);
  }
);

// GET route for all details of products
app.get("/getProducts", async (req, res) => {
  const category = req.query.category;
  const gender = req.query.gender;
  if (gender) {
    const request = await db.query(
      "SELECT p.id, p.name, p.brand, p.description, p.original_price, p.current_price, p.category, p.gender, p.stock_quantity, pi.main, pi.left_view, pi.right_view, pi.top_view, pi.bottom_view FROM products p JOIN products_images pi ON p.id = pi.product_id WHERE p.gender = $1",
      [gender]
    );
    res.status(200).json(request.rows);
  } else if (category) {
    const request = await db.query(
      "SELECT p.id, p.name, p.brand, p.description, p.original_price, p.current_price, p.category, p.gender, p.stock_quantity, pi.main, pi.left_view, pi.right_view, pi.top_view, pi.bottom_view FROM products p JOIN products_images pi ON p.id = pi.product_id WHERE p.category = $1",
      [category]
    );
    res.status(200).json(request.rows);
  } else {
    const request = await db.query(
      "SELECT p.id, p.name, p.brand, p.description, p.original_price, p.current_price, p.category, p.gender, p.stock_quantity, pi.main, pi.left_view, pi.right_view, pi.top_view, pi.bottom_view FROM products p JOIN products_images pi ON p.id = pi.product_id"
    );
    res.status(200).json(request.rows);
  }
});

// DELETE route for deleting Products
app.delete("/deleteProduct/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id);

  if (isNaN(id)) {
    return res.status(400).send({ error: "Invalid product ID" });
  }

  try {
    // Begin a transaction
    await db.query("BEGIN");

    // Delete the product
    const productDeleteResult = await db.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (productDeleteResult.rowCount === 0) {
      await db.query("ROLLBACK");
      return res.status(404).send({ error: "Product not found" });
    }

    // Delete the associated images
    await db.query("DELETE FROM products_images WHERE product_id = $1", [id]);

    // Commit the transaction
    await db.query("COMMIT");

    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error deleting product:", error);
    res
      .status(500)
      .send({ error: "An error occurred while deleting the product" });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const request = await db.query(
      "SELECT p.id, p.name, p.brand, p.description, p.original_price, p.current_price, p.category, p.gender, p.stock_quantity, pi.main, pi.left_view, pi.right_view, pi.top_view, pi.bottom_view FROM products p JOIN products_images pi ON p.id = pi.product_id WHERE p.id = $1",
      [id]
    );
    res.status(200).json(request.rows);
  } catch (e) {
    console.log(e.message);
  }
});

// POST route to add product to cart/bag
app.post("/addtobag", async (req, res) => {
  const { customerId, productId, quantity } = req.body;
  try {
    const check = await db.query(
      "SELECT * FROM cart WHERE customer_id = $1 AND product_id = $2",
      [customerId, productId]
    );
    if (check.rows.length > 0) {
      const result = await db.query(
        "UPDATE cart SET quantity = quantity + $1 WHERE customer_id = $2 and product_id = $3",
        [quantity, customerId, productId]
      );
      res.status(200).json({ message: "Product added to cart!" });
    } else {
      const result = await db.query(
        "INSERT INTO cart (customer_id, product_id, quantity) VALUES ($1, $2, $3)",
        [customerId, productId, quantity]
      );
      // console.log(quantity);
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/bag", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await db.query(
      "SELECT c.id as customer_id, c.name as customer_name, c.email, c.phone, c.address, ca.product_id, ca.quantity, p.name as product_name, p.brand, p.current_price, pi.left_view FROM customers c JOIN cart ca ON c.id = ca.customer_id JOIN products p ON p.id = ca.product_id JOIN products_images pi ON p.id = pi.product_id WHERE customer_id = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
  }
});

app.put("/cart/update-quantity", async (req, res) => {
  const { customer_id, product_id, quantity } = req.body;

  try {
    await db.query(
      "UPDATE cart SET quantity = $1 WHERE customer_id = $2 AND product_id = $3",
      [quantity, customer_id, product_id]
    );
    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cart", async (req, res) => {
  const { customer_id, product_id } = req.query;
  const result = await db.query(
    "SELECT * FROM cart WHERE customer_id = $1 AND product_id = $2",
    [customer_id, product_id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Product not found in cart" });
  }
  res.json(result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
