require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const mongoose = require('mongoose');
const schema = new mongoose.Schema
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


adminSchema.methods.generateToken = async _ => {
    const loginUser = this;
    const token = await jwt.sign({_id:loginUser._id,isAdmin : loginUser.isAdmin},
        secretKey,{expiresIn:'1h'});
    return token;
}
adminSchema.methods.login = async (username , password) => {
        const filter = {
            username,
            password
          };
          const adminFind = await admin.find(filter)
        if(!adminFind){
           return {
            error : "username or password is wrong"
           }
        }
            return adminFind;
    }

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;

