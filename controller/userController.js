const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
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
const userAddFavoriteAndBorrow = async(req,res) => {
    let responseMessage
    try {
        console.log(req.body)
        const favoritedOrBorrowedBook = {
            name : req.body.bookName,
            publisher : req.body.bookPublisher,
            author : req.body.bookAuthor,
            stock : req.body.bookStock,
            publicationDate : req.body.bookPublicationDate,
            pageCount : req.body.BookPageCount,
            ISBN : req.body.bookBarcodNo,
            language : req.body.bookLanguage,
            genre : req.body.bookCategory,
            description : req.body.bookDescription
        }
            const jwtUserId = jwt.verify(req.header('Authorization').replace('Bearer ', ''),process.env.SECRET_KEY)
            const userExist = await userModel.findById({_id : jwtUserId.id})

            if(!userExist == [] && req.params.buttonName === 'addFavorite'){
                userExist.favoritedBooks.push(favoritedOrBorrowedBook)
                await userExist.save()
                responseMessage = 'this book was succesfully add favorited'

            }else if(!userExist == [] && req.params.buttonName === 'addBorrow'){
                userExist.borrowedBooks.push(favoritedOrBorrowedBook)
                await userExist.save()
                responseMessage = 'this book was succesfully add borrowed'
            }
        res.status(200).send({message : responseMessage})
    } catch (error) {
        res.status(500).send({error})
    }
   

}
module.exports = {
    userPage,
    userLogin,
    userRegister,
    userAddFavoriteAndBorrow
}