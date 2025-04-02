require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
require('./db/conn')();
const redis = require('redis');
const { RedisStore } = require('connect-redis');
const redisClient = require("./config/redisClient");

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const langRouter = require('./routes/languages')
const favouriteLanguagesRouter = require('./routes/favoutiteLanguages');



const app = express();



// Configure Session Middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 10, // 10 minutes
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




app.use('/',indexRouter ); //localhost:3000/
app.use('/auth', authRouter);
app.use('/languages', langRouter);
app.use('/favourite-languages', favouriteLanguagesRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
