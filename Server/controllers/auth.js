
import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};


// export const loginRequired = (req, res, next) => {
//     try {
//         const token = req.headers["authorization"]
//         // console.log(token);
//         if (!token) {
//             return res.status(401).send("Please login to access this route!!");
//         }

//         const data = jwt.verify(token, process.env.jwt_secret)
//         req.user = data;
//     } catch (error) {
//         return res.status(500).json({ error });
//     }

//     next();
// };

// ++++++++++++ CHECK USER ROLE FOR REDIRECTION ++++++++++++++++++++
export const checkUser = async (reg, res) => {
    if (req.user) {
        res.status(200).json({ name: req.user.username, role: req.user.role });
    }
};
// Register User

export const Register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const defaultRole = 'user'; // Set the default role value here

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE username = @username OR email = @email');
        const user = result.recordset[0];

        if (user) {
            res.status(409).json({ error: 'User already exists' });
        } else {
            await pool.request()
                .input('username', sql.VarChar, username)
                .input('email', sql.VarChar, email)
                .input('hashedPassword', sql.VarChar, hashedPassword)
                .input('role', sql.VarChar, defaultRole) // Use the default role value here
                .query('INSERT INTO Users (username, email, password, role) VALUES (@username, @email, @hashedPassword, @role)');

            res.status(200).send({ message: 'User created successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    } finally {
        sql.close();
    }
};


export const login = async (req, res) => {
    const { username, password } = req.body;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Users WHERE username = @username');
    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Authentication failed. Wrong credentials.' });
    } else {
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ error: 'Authentication failed. Wrong credentials.' });
        } else {
            const token = `${jwt.sign({ username: user.username, email: user.email }, config.jwt_secret)}`;
            res.status(200).json({ email: user.email, username: user.username, id: user.user_id, role: user.role, token: token });
        }
    }

};

