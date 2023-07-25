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
export const getUserOrders = async (req, res) => {
    const { user_id } = req.params
    try {
        // console.log("user_id:", user_id);

        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("user_id", sql.Int, user_id)
            .query("SELECT  order_id, email, productName, status FROM Payment WHERE user_id = @user_id");

        !result.recordset[0] ? res.status(404).json({ message: 'You have not made any Order Yet!!!' }) :
            res.status(200).json(result.recordset);

    } catch (error) {
        console.log("error:", error);
        res.status(201).json({ error: 'an error occurred while retrieving orders' });
    } finally {
        // sql.close(); // Close the SQL connection
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { user_id } = req.params; // Corrected typo from "oder_id" to "order_id"
        const pool = await sql.connect(config.sql);
        const result = await pool
            .request()
            .input("user_id", sql.Int, user_id)
            .query("DELETE FROM Payment WHERE order_id = @user_id");

        // Check if any rows were affected by the deletion
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while cancelling an Order' });
    } finally {
        // sql.close();
    }
};
