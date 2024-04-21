const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: true,
    credentials: true
}));
app.set('trust proxy', 1);
app.use(express.json());

app.use('/users', require('./routers/user.router'));


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);  
});
