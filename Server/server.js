import express from "express";
import config from './db/config.js'
import jwt from "jsonwebtoken";
import cors from 'cors'
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoute.js';
import productsRoute from "./routes/productRoute.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//jwt middleware
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// my-routes
userRoutes(app);
productsRoute(app)
app.get('/', (req, res) => {
    res.send("Server is running");
});


app.listen(config.port, () => {
    console.log(`Server is running on ${config.url}`);
});