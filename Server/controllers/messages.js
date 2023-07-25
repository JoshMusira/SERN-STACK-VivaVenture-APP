import sql from 'mssql';
import config from '../db/config.js';

//Create Messages
export const messageSent = async (req, res) => {
    const { username, message, time } = req.body;

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('message', sql.VarChar, message)
            .query('SELECT * FROM Messages WHERE username = @username OR message = @message');
        const messageFound = result.recordset[0];

        if (messageFound) {
            res.status(409).json({ error: 'Message already Sent' });
        } else {
            await pool.request()
                .input('username', sql.VarChar, username)
                .input('message', sql.VarChar, message)
                .input('time', sql.VarChar, time) // Use the default time value here
                .query('INSERT INTO Messages (username, message , Time) VALUES (@username, @message, @time)');

            res.status(200).send({ message: 'Message sent ' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while sending the message' });
    } finally {
        // sql.close();
    }
};

// Get a users Message
export const getUserMessage = async (req, res) => {
    try {
        const { username } = req.params;
        // console.log(username);
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("username", sql.VarChar, username)
            .query("SELECT * FROM Messages WHERE username = @username");
        !result.recordset[0] ? res.status(404).json({ message: 'No messages' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving Messages' });
    } finally {
        // sql.close();
    }
};