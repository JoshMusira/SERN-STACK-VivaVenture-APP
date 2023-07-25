import sql from 'mssql';
import config from '../db/config.js';

// Get all Transactions

export const getLatestTransactions = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Payment ORDER BY date DESC");

        !result.recordset[0] ? res.status(404).json({ message: 'Orders not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error)
        res.status(201).json({ error: 'an error occurred while retrieving orders' });
    } finally {
        // sql.close(); // Close the SQL connection
    }
};