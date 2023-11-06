const userModel = require('../model/userModel')

const userPage = (req,res) => {
    res.render('userPages/account')
}

const userLogin = async(req,res) => {
    console.log(req.body)
}
const userRegister = async(req,res) => {
    console.log(req)
    const user = new userModel(req.body)
    const result = user.save()
    if(result){
        res.send(result)
    }
    else{
        res.send(result)
    }

}
module.exports = {
    userPage,
    userLogin,
    userRegister
}