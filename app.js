const express = require('express');
const axios = require('axios');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const redis = require('redis');
const { RedisStore } = require('connect-redis');
const redisClient = redis.createClient();
require('./db/conn')();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const langRouter = require('./routes/languages')
const favouriteLanguagesRouter = require('./routes/favoutiteLanguages');

require('dotenv').config();


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
  store : new RedisStore({client : redisClient}),
  secret : 'secret-keysssdsdasd',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false , //if true, the cookie only be sent over https
    httpOnly: false, //if true, the cookie only be accessed by the server
    maxAge: 1000 * 60 * 10 //10 minutes
  },
}));

(async () => {
  redisClient.on('error', (err) => {
    console.error('🔴 Redis client error', err);
  })
  
  redisClient.on('ready', () => {
    console.log('🟢 Redis client started');
  })
  
  await redisClient.connect();
  
  await redisClient.ping();
})();



app.use('/',indexRouter ); //localhost:3000/
app.use('/auth', authRouter);
app.use('/languages', langRouter);
app.use('/favourite-languages', favouriteLanguagesRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
