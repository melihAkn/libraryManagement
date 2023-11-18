const adminModel = require('../model/adminModel')
const userModel = require('../model/userModel')
const userMessageModel = require('../model/userMessagesModel')
const booksModel = require('../model/bookModel')
const jwt = require('jsonwebtoken')

const adminPage = (req , res) => {
res.render('./adminPages/admin')
}

const adminLoginPage = (req , res) => {
    res.locals.layout = ''
    res.render('./adminPages/adminLogin')
}

const getUsersPage = (req,res) =>{
    
    res.render('./adminPages/getUsers')


}

const getUserMessagesPage = (req,res) =>{
    
    res.render('./adminPages/getUserMessages')


}
const adminLogin = async(req,res) => {
    
    try {
        const adminLogin = await adminModel.login(req.body.username,req.body.password)
        if(!adminLogin.error){
            res.cookie('token',adminLogin.token,{maxAge : 3600000,httpOnly: true, path: '/admin'})
            res.status(200).redirect('/admin')
        }
        else{
            res.status(500).render('./adminPages/adminLogin',{message : adminLogin.error})
            
        }
    } catch (e) {
        res.status(500).render('./adminPages/adminLogin',{message : e})
    }
}

const adminGetCookie = (req,res) => {
    try {
        const token = req.cookies.token
        if(token){
            res.status(200).send({token,tokenFound : true})
        }
    } catch (error) {
        res.status(401).send({message :'token not found',error,tokenFound : false})
    }
}
const adminValidToken = (req,res) => {
    try {
        const validToken = jwt.verify(req.header('authorization').replace('Bearer ',''),process.env.ADMIN_SECRET_KEY)
        if(validToken.id){
            res.status(200).send(true)
        }else{
            res.status(200).send(false)
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
    
}
const removeToken = (req,res)=> {

}
const getUsers = async(req,res) => {
    try {
        const admin =jwt.verify(req.header('authorization').replace('Bearer ',''),process.env.ADMIN_SECRET_KEY)
        const users = await userModel.find({} ,{ _id: 0 , name: 1 , surname : 1 , username : 1 , email : 1 , phoneNumber : 1 , favoritedBooks : 1 })
        res.status(200).send(users)

    } catch (error) {
        console.error(error)
        res.status(400).send({message : error}) 
    }
}

const getBooks = async(req,res) => {
    try {
        const books = await booksModel.find({})
        res.status(200).send(books)


    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}
const deleteBook = async(req,res) => {
    try {
        console.log(req.params)
        const barcodNo = req.params.barcodNo
       const deleteBook = await booksModel.deleteOne({ISBN : barcodNo})
        console.log(deleteBook)
        if(deleteBook.acknowledged == true){
            res.status(200).send({message : `${barcodNo} this book deleted`})
        }else{
            res.status(500).send('wrong ISBN') 
        }
        
    } catch (error) {
        console.error(error)
        res.satus(500).send(error)
    }

}

const updateBook = async(req,res) => {

}
const getUserMessages = async(req,res) => {
    try {
        const admin = jwt.verify(req.header('authorization').replace('Bearer ',''),process.env.ADMIN_SECRET_KEY)
        const books = await userMessageModel.find({})
        res.status(200).send(books)

    } catch (error) {
        res.status(400).send({message : error}) 
    }

}


module.exports = {
    adminLoginPage,
    adminPage,
    adminLogin,
    adminGetCookie,
    adminValidToken,
    getBooks,
    deleteBook,
    updateBook,
    getUsersPage,
    getUsers,
    getUserMessagesPage,
    getUserMessages

}