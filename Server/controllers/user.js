import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';

// Get all Users
export const getAllUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Users");
        !result.recordset[0] ? res.status(404).json({ message: 'User not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error)
        res.status(201).json({ error: 'an error occurred while retrieving a User' });
    } finally {
        sql.close(); // Close the SQL connection
    }
};


//Update the details of a user
export const createAddress = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { address_line1, address_line2, city, state, zip_code, country } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("user_id", sql.Int, user_id)
            .input("address_line1", sql.VarChar, address_line1)
            .input("address_line2", sql.VarChar, address_line2)
            .input("city", sql.VarChar, city)
            .input("state", sql.VarChar, state)
            .input("zip_code", sql.VarChar, zip_code)
            .input("country", sql.VarChar, country)
            .query("INSERT INTO Addresses (user_id, address_line1, address_line2, city, state, zip_code, country) VALUES (@user_id, @address_line1, @address_line2, @city, @state, @zip_code, @country)");
        res.status(200).json({ message: 'Address created successfully' });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'An error occurred while creating an address' });
    } finally {
        sql.close();
    }
};

//update address
export const updateAddress = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { address_line1, address_line2, city, state, zip_code, country } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("user_id", sql.Int, user_id)
            .input("address_line1", sql.VarChar, address_line1)
            .input("address_line2", sql.VarChar, address_line2)
            .input("city", sql.VarChar, city)
            .input("state", sql.VarChar, state)
            .input("zip_code", sql.VarChar, zip_code)
            .input("country", sql.VarChar, country)
            .query("UPDATE Addresses SET address_line1 = @address_line1, address_line2 = @address_line2, city = @city, state = @state, zip_code = @zip_code, country = @country WHERE user_id = @user_id");
        res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the address' });
    } finally {
        sql.close();
    }
};



// Get a single User
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM Users WHERE user_id = @id");
        !result.recordset[0] ? res.status(404).json({ message: 'User not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving todo' });
    } finally {
        sql.close();
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        let pool = await sql.connect(config.sql);

        // Delete the user from the Users table
        await pool.request()
            .input("user_id", sql.Int, user_id)
            .query("DELETE FROM Users WHERE user_id = @user_id");

        // Delete the corresponding address from the Addresses table
        await pool.request()
            .input("user_id", sql.Int, user_id)
            .query("DELETE FROM Addresses WHERE user_id = @user_id");

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    } finally {
        sql.close();
    }
};

// Delete a User
export const deleteUse = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Users WHERE user_id = ${id}`;
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while deleting a User' });
    } finally {
        sql.close();
    }
};


