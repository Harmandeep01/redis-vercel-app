require('dotenv').config();
const connectRedis = require('connect-redis')
const express = require('express');
const axios = require('axios');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
require('./db/conn')();
const redis = require('redis');
const getRedisClient =require('./config/getRedis')
const { RedisStore } = require('connect-redis');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const langRouter = require('./routes/languages')
const favouriteLanguagesRouter = require('./routes/favoutiteLanguages');



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

async function setupSession() {
  const redisClient = await getRedisClient()
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 10 // 10 minutes
    },
  }));

  console.log("✅ Session store is ready!");
}

// Initialize session store
setupSession().catch(console.error);



app.use('/',indexRouter ); //localhost:3000/
app.use('/auth', authRouter);
app.use('/languages', langRouter);
app.use('/favourite-languages', favouriteLanguagesRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
