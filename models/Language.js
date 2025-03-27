const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const languageSchema = new mongoose.Schema({
    name :{
        type : String,
        unique : true,
        required : true
    },
    iconUrl:{
        type : String,
        required : true
    }
},
{
    timestamps : true
});

const Language = mongoose.model('Language', languageSchema);
module.exports = Language;