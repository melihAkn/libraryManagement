const bookModel = require('../model/bookModel')



const index = (req,res) => {
    res.render('./indexPages/index')
}
const about = (req,res) => {
    res.render('./indexPages/about')
}
const contact = (req,res) => {
    res.render('./indexPages/contact')
}
const searchBooks = (req,res) => {
    res.render('./indexPages/searchBooks')
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
    index,
    about,
    contact,
    searchBooks,
    getBooks
}