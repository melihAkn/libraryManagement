const userModel = require('../model/userModel')

const userPage = (req,res) => {
    res.render('userPages/account')
}

const userLogin = async(req,res) => {
    try {
        const userLogin = await userModel.login(req.body.username,req.body.password)
        if(!userLogin.error){
            res.cookie('token',userLogin.token,{maxAge : 3600000,httpOnly: true})
            res.status(200).redirect('/')
        }
        else{
            console.log(userLogin.error)
            res.status(500).render('./userPages/userLogin',{message : userLogin.error})
            
        }
    } catch (e) {
        console.log(e)
        res.status(500).render('./userPages/userLogin',{message : e})
    }
 
}
const userRegister = async(req,res) => {
    try {
        console.log(req.body)
        const user = new userModel(req.body)
        const result = await user.save()
        if(result){
            res.status(200).redirect('/userLogin');
        }
    } catch (error) {
        console.log(error.message)
        res.render('./userPages/userRegister',{message : error.message})
    }


}
module.exports = {
    userPage,
    userLogin,
    userRegister
}