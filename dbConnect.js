require('dotenv').config();
const mongoose = require('mongoose');
// require('dotenv').config/

module.exports = () => {

    //console.log(DB_URL.toString());

    return mongoose.connect("mongodb://127.0.0.1:27017/best-languages").then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.error('MongoDB connection error', err.message);
    });
}