import express from "express";
import config from './db/config.js'
import jwt from "jsonwebtoken";
import cors from 'cors'
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoute.js';
import productsRoute from "./routes/productRoute.js";
import addressRoutes from "./routes/addressRoute.js"
import stripe from "./routes/stripeRoute.js";
import { Server } from "socket.io";
// import http from 'http'

const app = express();
// const server = http.createServer(app); // Create an HTTP server

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
addressRoutes(app)
stripe(app)

app.get('/', (req, res) => {
    res.send("Server is running");
});

const server = app.listen(config.port, () => {
    console.log(`Server is running on ${config.url}`);
});


// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected with ID', socket.id);
    // Handle your socket.io events here
    socket.emit("Data", "Welcome to VivaVenture");
    socket.emit("Order", "What would you wish to enquire");

    app.use("/product", (req, res) => {
        socket.emit("Product", req.body.price);
        res.send(200);
    });
    socket.on("Client", (data) => {
        console.log(data);
    })
});