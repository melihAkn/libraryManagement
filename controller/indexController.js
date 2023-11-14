const bookModel = require('../model/bookModel')
const userMessagesModel = require('../model/userMessagesModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const indexPage = (req,res) => {
    res.render('./indexPages/index')
}
const aboutPage = (req,res) => {
    res.render('./indexPages/about')
}
const contactPage = (req,res) => {
    res.render('./indexPages/contact')
}
const searchBooksPage = (req,res) => {
    res.render('./indexPages/searchBooks')
}

const userLoginPage = (req,res) => {
    res.render('./userPages/userLogin')
}

const userRegisterPage = (req,res) => {
    res.render('./userPages/userRegister')
}


const getCookie = (req,res) => {
    //raw headers da token var
    try {
        const token = req.headers.cookie.split('token=')[1]
        if(token){
            res.status(200).send({token})
        }
    } catch (error) {
        res.status(401).send({message :'token not found',error})
    }
 
}
const validToken =(req,res) => {

    try {
        const jwtControl = jwt.verify(req.header('Authorization').replace('Bearer ', ''),process.env.SECRET_KEY)
        if(jwtControl){
            res.status(200).send('token is valid')
        }else{
            throw new error({message :'token is not valid'})
        }
        
        
        
    } catch (error) {
        res.status(401).send({message :'invalid token',error})
        
    }
}

const getBooks = async (req,res) => {
    let bookFilter = {
        name :''
    }
    let books
    if(req.params.name === "" || req.params.name == undefined){
         books = await bookModel.find({})
         res.send(books)
    }
    else{
        let searchedBooks = []
        allBooks = await bookModel.find({})
        allBooks.forEach(e => {
            if(e.name.includes(req.params.name)){
                searchedBooks.push(e)
            }
        })         
        res.send(searchedBooks)
    }
    
}

const userContactRequest = async(req,res) => {
    try {
        const messageJSON ={
            nameAndSurname : req.body.nameAndSurname,
            contactAddress : req.body.contactAddress,
            message : req.body.message.replace(/\r?\n|\r/g, '')
        }
        console.log(messageJSON)
        const userMessages = new userMessagesModel(messageJSON)
        const saveMessageResult = await userMessages.save()
        console.log(saveMessageResult)


        res.status(200).render('./indexPages/contact',{message : 'message was succesfully send'})

    } catch (error) {
        res.status(500).send({message : error})
    }





}
module.exports = {
    indexPage,
    aboutPage,
    contactPage,
    userLoginPage,
    userRegisterPage,
    searchBooksPage,
    getBooks,
    getCookie,
    validToken,
    userContactRequest

}