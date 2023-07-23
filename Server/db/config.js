import dotenv from 'dotenv';
import assert from 'assert'; // assert is a nodejs module that validates if a condition is true or false

dotenv.config();

const { PORT, HOST, HOST_URL, SQL_USER, SQL_PWD, SQL_DB, SQL_SERVER, JWT_SECRET, STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STATIC_DIR } = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    STRIPE_PUBLISHABLE_KEY: STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: STRIPE_SECRET_KEY,
    STATIC_DIR: STATIC_DIR,
    sql: {
        server: SQL_SERVER,
        database: SQL_DB,
        user: SQL_USER,
        password: SQL_PWD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    },
    jwt_secret: JWT_SECRET
};

export default config;