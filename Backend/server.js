import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import multer from "multer";
import Razorpay from "razorpay";
import crypto from "crypto";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;
env.config();

const saltRounds = 10;
const secretKey = "TOPSECRET";

// postgresql configuration
// const db = new pg.Client({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });

// NEON Configurations
const connectionString = process.env.DATABASE_URL;
const db = new pg.Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();

// Middlewares

// Token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (token) {
    jwt.verify(token, secretKey, (err, valid) => {
      if (err) {
        res.status(401).json({ message: "Enter valid token." });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Enter authentication token." });
  }
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://solespace-ecommerce.vercel.app", "http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());

// Default GET endpoint
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

app.get("/get-orders", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM orders");
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
  }
});

app.get("/get-transactions", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM transactions");
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
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
      await bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing the password", err);
        } else {
          const result = await db.query(
            "INSERT INTO customers (name, email, phone, address, password) VALUES ($1, $2, $3, $4, $5);",
            [name, email, phone, address, hash]
          );
          res
            .status(200)
            .json({ message: "You are signed up, please log in!" });
        }
      });
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
    if (userCheck.rows.length > 0) {
      const user = userCheck.rows[0];
      const storedHashedPassword = user.password;

      const passwordMatch = await bcrypt.compare(
        password,
        storedHashedPassword
      );
      if (passwordMatch) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          secretKey, // Replace with your actual secret
          { expiresIn: "2h" }
        );

        // Set token as a cookie
        res.cookie("token", token, {
          httpOnly: true, // Ensures the cookie is only accessible by the web server
          secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS
          maxAge: 7200000, // 1 hour
        });

        res.status(200).json({
          message: "You have successfully logged in!",
          userData: user,
          authToken: token,
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
  const { customerId, productId, quantity, size } = req.body;
  // console.log(size);
  try {
    const check = await db.query(
      "SELECT * FROM cart WHERE customer_id = $1 AND product_id = $2 AND size = $3",
      [customerId, productId, size]
    );
    if (check.rows.length > 0) {
      const result = await db.query(
        "UPDATE cart SET quantity = quantity + $1 WHERE customer_id = $2 and product_id = $3",
        [quantity, customerId, productId]
      );
      res.status(200).json({ message: "Product added to cart!" });
    } else {
      const result = await db.query(
        "INSERT INTO cart (customer_id, product_id, quantity, size) VALUES ($1, $2, $3, $4)",
        [customerId, productId, quantity, size]
      );
      // console.log(quantity);
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/bag", verifyToken, async (req, res) => {
  // console.log(req.headers.authorization);
  const { id } = req.query;
  try {
    const result = await db.query(
      "SELECT c.id as customer_id, c.name as customer_name, c.email, c.phone, c.address, ca.product_id, ca.quantity, p.name as product_name, p.brand, p.current_price, (ca.quantity * p.current_price) as total_price, pi.left_view FROM customers c JOIN cart ca ON c.id = ca.customer_id JOIN products p ON p.id = ca.product_id JOIN products_images pi ON p.id = pi.product_id WHERE customer_id = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
  }
});

app.get("/get-subtotal", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await db.query(
      `WITH bag_data AS (
        SELECT (ca.quantity * p.current_price) as total_price
        FROM customers c 
        JOIN cart ca ON c.id = ca.customer_id 
        JOIN products p ON p.id = ca.product_id 
        WHERE c.id = $1
      )
      SELECT SUM(total_price) as subtotal 
      FROM bag_data`,
      [id]
    );
    res.status(200).json(result.rows[0]);
    // console.log(result.rows[0]);
  } catch (e) {
    console.log(e.message);
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

// Create order endpoint
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount, // amount in smallest currency unit
      currency: "INR",
      receipt: req.body.receipt,
      payment_capture: "1", // auto capture
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Order validation endpoint
app.post("/order/validate", async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    id, // customer_id
    amount,
  } = req.body.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ message: "Transaction failed!" });
  }

  try {
    // Begin transaction
    await db.query("BEGIN");

    // Insert order into orders table
    const orderResult = await db.query(
      "INSERT INTO orders (customer_id, date, total_amount, shipping_method, order_status) VALUES ($1, CURRENT_DATE, $2, 'Free Shipping', 'In Progress') RETURNING id",
      [id, amount]
    );
    const orderId = orderResult.rows[0].id;

    // Insert transaction into transaction table
    await db.query(
      "INSERT INTO transactions (order_id, payment_method, amount, date) VALUES ($1, 'Razorpay', $2, CURRENT_DATE)",
      [orderId, amount]
    );

    // Retrieve items from customer's cart
    const cartItemsResult = await db.query(
      "SELECT * FROM cart WHERE customer_id = $1",
      [id]
    );
    const cartItems = cartItemsResult.rows;

    // Insert each item into order_items table
    for (const item of cartItems) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // Clear the customer's cart
    await db.query("DELETE FROM cart WHERE customer_id = $1", [id]);

    // Commit transaction
    await db.query("COMMIT");

    res.json({
      message: "Transaction successful!",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    // Rollback transaction in case of error
    await db.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
