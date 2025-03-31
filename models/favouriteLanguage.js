const mongoose = require('mongoose')
const Language = require('./Language')
const User = require('./User')

const favouriteSchema = new mongoose.Schema({
    language : {
        type : mongoose.Schema.ObjectId,
        ref : Language,
        required : true
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : User,
        required : true
    }
});

const FavouriteLanguage = mongoose.model('FavouriteLanguage', favouriteSchema);
module.exports = FavouriteLanguage;