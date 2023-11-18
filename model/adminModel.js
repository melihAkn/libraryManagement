require('dotenv').config();
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY;
const mongoose = require('mongoose');
const schema =  mongoose.Schema
const adminSchema = new schema({

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
    isAdmin : {
        type : Boolean,
        default : true,

        
    }
    },{collection:'admin', timestamps: true})


adminSchema.statics.login = async (username , password) => {
    const secretKey = process.env.ADMIN_SECRET_KEY
    const filter = {
        username,
        password
      };
      const adminFind = await Admin.findOne(filter)
      
    if(!adminFind){
       return {
        error : "username or password is wrong"
       }
    }
    const token = jwt.sign({id : adminFind._id,isAdmin : adminFind.isAdmin},secretKey)
    adminFind.token = token
        return {
            admin : adminFind,
            token
        }
        }

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;

