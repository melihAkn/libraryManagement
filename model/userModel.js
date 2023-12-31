const mongoose = require('mongoose')
const schema =  mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new schema({
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
    email : {
        type : String,
        required : true,
        maxlength : 256,
    },
    phoneNumber : {
        type : String,
        required : false,
    },
    favoritedBooks : {
        type : Array,
        Books : [{ type: String }],
        required : false,
        default : []
    },
    borrowedBooks : {
        type : Array,
        Books : [{ type: String }],
        required : false,
        default : []
    }
},{collection:'users', timestamps: true})

userSchema.statics.login = async (username , password) => {
    const secretKey = process.env.SECRET_KEY
    const filter = {
        username,
        password
      };
      const userFind = await Users.findOne(filter)
      
    if(!userFind){
       return {
        error : "username or password is wrong"
       }
    }
    const token = jwt.sign({id : userFind._id},secretKey)
    userFind.token = token
        return {
            user : userFind,
            token
        }
        }
const Users = mongoose.model('users', userSchema);
module.exports = Users;