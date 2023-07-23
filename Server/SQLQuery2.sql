-- Create Users table
CREATE TABLE Users (
  user_id INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
 role VARCHAR(255)  DEFAULT 'user'
);

-- Create Addresses table
CREATE TABLE Addresses (
  address_id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT UNIQUE,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip_code VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


-- Create Orders table
CREATE TABLE Orders (
  order_id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NOT NULL,
  order_date DATE,
  total_amount DECIMAL(10, 2),
  status VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Create Products table
CREATE TABLE Products (
  product_id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  price DECIMAL(10, 2),
  image_url VARCHAR(255),
  inventory_count INT,
  category VARCHAR(255)
 

);


-- Create OrderItems table
CREATE TABLE OrderItems (
  order_item_id INT IDENTITY(1,1) PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT,
  price DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Create Likes table
CREATE TABLE Likes (
  like_id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Create Messages table
CREATE TABLE Messages (
  message_id INT IDENTITY(1,1) PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content VARCHAR(255),
  timestamp TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES Users(user_id),
  FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

