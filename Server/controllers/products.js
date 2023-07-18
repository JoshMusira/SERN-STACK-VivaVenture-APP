import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';

// Create a product
export const createProduct = async (req, res) => {
    const { name, description, price, image_url, inventory_count, category, storage, ram } = req.body;
    // console.log(name, description, price, image_url, inventory_count, category, storage, ram);
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .input('category', sql.VarChar, category)
            .query('SELECT * FROM Products WHERE name = @name AND description = @description AND category = @category');
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'Product already exists' });
        } else {
            await pool.request()
                .input('name', sql.VarChar, name)
                .input('description', sql.VarChar, description)
                .input('image_url', sql.VarChar, image_url)
                .input('price', sql.Int, price)
                .input('inventory_count', sql.Int, inventory_count)
                .input('category', sql.VarChar, category)
                .input('storage', sql.VarChar, storage)
                .input('ram', sql.VarChar, ram)
                .query('INSERT INTO Products (name, description, image_url, price, inventory_count, category, storage, ram) VALUES (@name, @description, @image_url, @price, @inventory_count, @category,@storage,@ram)');
            res.status(200).send({ message: 'Product created successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    } finally {
        sql.close();
    }
};

//Get all Products
export const getAllProducts = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Products");
        !result.recordset[0] ? res.status(404).json({ message: 'Products not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error)
        res.status(201).json({ error: 'an error occurred while retrieving Products' });
    } finally {
        sql.close(); // Close the SQL connection
    }
};

//Get category products
export const getCategoryProducts = async (req, res) => {
    const { category } = req.params;
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('category', sql.VarChar, category)
            .query('SELECT * FROM Products WHERE category = @category');
        const products = result.recordset;
        if (products.length === 0) {
            res.status(404).json({ message: 'No products found for the provided category' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving products' });
    } finally {
        sql.close();
    }
};

// Get a single Product
export const getProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        // console.log(product_id);
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("product_id", sql.Int, product_id)
            .query("SELECT * FROM Products WHERE product_id = @product_id");
        !result.recordset[0] ? res.status(404).json({ message: 'Product not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving a Product' });
    } finally {
        // sql.close();
    }
};

//update a product
export const updateProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const { name, description, price, image_url, inventory_count, category, storage, ram } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('product_id', sql.Int, product_id)
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .input('image_url', sql.VarChar, image_url)
            .input('price', sql.Decimal(10, 2), price)
            .input('inventory_count', sql.Int, inventory_count)
            .input('category', sql.VarChar, category)
            .input('storage', sql.Int, storage)
            .input('ram', sql.Int, ram)
            .query("UPDATE Products SET name = @name , description = @description, price = @price, image_url = @image_url, inventory_count = @inventory_count, category = @category, storage = @storage, ram =@ram WHERE product_id = @product_id;");
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the product' });
    } finally {
        sql.close();
    }
};

//delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Products WHERE product_id = ${product_id}`;
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while deleting a Product' });
    } finally {
        sql.close();
    }
};
