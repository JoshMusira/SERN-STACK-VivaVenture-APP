import sql from 'mssql';
import config from '../db/config.js';

// Create a User Address
export const createAddress = async (req, res) => {
    const { user_id, address_line1, address_line2, city, state, zip_code, country } = req.body;
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('address_line1', sql.VarChar, address_line1)
            .input('city', sql.VarChar, city)
            .input('state', sql.VarChar, state)
            .input('country', sql.VarChar, country)
            .query('SELECT * FROM Addresses WHERE user_id = @user_id AND address_line1 = @address_line1 AND city = @city AND state = @state AND country = @country');
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'Address already exists' });
        } else {
            await pool.request()
                .input('user_id', sql.Int, user_id)
                .input('address_line1', sql.VarChar, address_line1)
                .input('address_line2', sql.VarChar, address_line2)
                .input('city', sql.VarChar, city)
                .input('state', sql.VarChar, state)
                .input('zip_code', sql.VarChar, zip_code)
                .input('country', sql.VarChar, country)
                .query('INSERT INTO Products (user_id, address_line1, address_line2, city, state, zip_code, country) VALUES (@user_id, @address_line1, @address_line2, @city, @state, @zip_code,@country)');
            res.status(200).send({ message: 'Address created successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    } finally {
        // sql.close();
    }
};

// Get a single User Address
export const getAddress = async (req, res) => {
    try {
        const { user_id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("user_id", sql.Int, user_id)
            .query("SELECT * FROM Addresses WHERE user_id = @user_id");
        !result.recordset[0] ? res.status(404).json({ message: 'Product not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving an address' });
    } finally {
        // sql.close();
    }
};


//update an Address
export const updateAddress = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { address_line1, address_line2, city, state, zip_code, country } = req.body;

        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('address_line1', sql.VarChar, address_line1)
            .input('address_line2', sql.VarChar, address_line2)
            .input('city', sql.VarChar, city)
            .input('state', sql.VarChar, state)
            .input('zip_code', sql.VarChar, zip_code)
            .input('country', sql.VarChar, country)
            .query("UPDATE Products SET address_line1 = @address_line1 , address_line2 = @address_line2 , city = @city, state = @state, zip_code = @zip_code, country = @country WHERE user_id = @user_id;");
        res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the Address' });
    } finally {
        // sql.close();
    }
};

//delete an Address
export const deleteAddress = async (req, res) => {
    try {
        const { user_id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Addresses WHERE user_id = ${user_id}`;
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while deleting an Address' });
    } finally {
        // sql.close();
    }
};
