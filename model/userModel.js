const mongoose = require('mongoose')
const schema = new mongoose.Schema
const usersSchema = new schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 64,
    },
    surname : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 64,
    },
    username : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 256
    },
    eMail : {
        type : String,
        required : true,
        maxlength : 256,
    },
    phoneNumber : {
        type : String,
        required : false,
    },
},{collection:'users', timestamps: true})

const users = mongoose.model('users', usersSchema);
module.exports = users;