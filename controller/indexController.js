const bookModel = require('../model/bookModel')



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
module.exports = {
    indexPage,
    aboutPage,
    contactPage,
    userLoginPage,
    userRegisterPage,
    searchBooksPage,
    getBooks
}