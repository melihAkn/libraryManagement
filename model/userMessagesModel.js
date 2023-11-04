const mongoose = require('mongoose')
const schema =  mongoose.Schema
const userMessagesSchema = new schema({

    name :{
        type : String,
        required : true,
        maxLength : 64,
        minLength : 1,
    },
    surname : {
        type : String,
        required : true,
        maxLength : 64,
        minLength : 1,
    },
    contactAddress : {
        type : String,
        required : true,
        maxLength : 256,
        minLength : 3,
    },
    message : {
        type : String,
        required : true,
        minLength : 1
    }

},{collection:'userMessages', timestamps: true})

const userMessages = mongoose.model('userMessages', userMessagesSchema);
module.exports = userMessages;