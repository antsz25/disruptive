const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.set('trust proxy', 1);
app.use(express.json());

app.use('/users', require('./routers/user.router'));
app.use('/contents', require('./routers/content.router'));
app.use('/topics', require('./routers/topic.router'));

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);  
});
