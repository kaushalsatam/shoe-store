DROP TABLE IF EXISTS administrator, customers, products, products_images, cart, orders, order_items, transactions, reviews;

CREATE TABLE administrator(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE customers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(25) NOT NULL,
    description TEXT NOT NULL,
    original_price MONEY NOT NULL,
    current_price MONEY NOT NULL,
    category VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    stock_quantity BIGINT NOT NULL
);

CREATE TABLE products_images(
    id SERIAL PRIMARY KEY,
    main BYTEA NOT NULL,
    left_view BYTEA NOT NULL,
    right_view BYTEA NOT NULL,
    top_view BYTEA NOT NULL,
    bottom_view BYTEA NOT NULL,
    product_id INTEGER REFERENCES products(id)
);

CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    date DATE,
    total_amount MONEY,
    shipping_method VARCHAR(50),
    order_status VARCHAR(50)
);

CREATE TABLE order_items(
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price MONEY
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    payment_method VARCHAR(50),
    amount MONEY,
    date DATE
);

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    customer_id INTEGER REFERENCES customers(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    date DATE
);