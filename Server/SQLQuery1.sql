-- Create Users table
CREATE TABLE Users (
  user_id INT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(255)
);

-- Create Addresses table
CREATE TABLE Addresses (
  address_id INT PRIMARY KEY,
  user_id INT,
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code VARCHAR(255),
  country VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Create Orders table
CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  user_id INT,
  order_date DATE,
  total_amount DECIMAL(10, 2),
  status VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Create Products table
CREATE TABLE Products (
  product_id INT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  price DECIMAL(10, 2),
  image_url VARCHAR(255),
  inventory_count INT
);
-- Create OrderItems table
CREATE TABLE OrderItems (
  order_item_id INT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Create Likes table
CREATE TABLE Likes (
  like_id INT PRIMARY KEY,
  user_id INT,
  product_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Create Messages table
CREATE TABLE Messages (
  message_id INT PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  content VARCHAR(255),
  timestamp TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES Users(user_id),
  FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE
);



-- Create Categories table
CREATE TABLE Categories (
  category_id INT PRIMARY KEY,
  name VARCHAR(255)
);

-- Create ProductCategories table
CREATE TABLE ProductCategories (
  product_category_id INT PRIMARY KEY,
  product_id INT,
  category_id INT,
  FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);
