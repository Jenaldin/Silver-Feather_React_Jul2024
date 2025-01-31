require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const apiRouter = require('./router');
const routes = require('./routes');

const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/silver-feather';
const dbPort = process.env.DB_PORT || '3000';
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(express.static('public'));
app.use('/api', apiRouter);
app.use(routes);

mongoose.connect(dbUri);
mongoose.connection.on('connected', () => console.log('DB is Connected!'));
mongoose.connection.on('disconnected', () => console.log('DB is Disconnected!'));
mongoose.connection.on('error', (err) => console.log('DB Error: ' + err));

app.listen(dbPort, () => console.log(`App is listening on http://localhost:${dbPort}`));