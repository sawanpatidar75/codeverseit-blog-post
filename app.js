const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./configs/db');
const { errorMiddleware } = require('./middlewares/resHandler.js');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
connectDB();

app.use('/api', require('./routes/index'));

module.exports = app;