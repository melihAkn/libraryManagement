const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const pagesLayoutSet = require('../middleware/pagesLayoutSet')
userRouter.use(pagesLayoutSet.userPageLayout)
userRouter.get('/',userController.userPage)

userRouter.get('/favoritedBooks',userController.userFavoritedBooksPage)

userRouter.get('/borrowedBooks',userController.userBorrowedBooksPage)
userRouter.get('/getFavoritedBooks/:name?',userController.getFavoritedBooks)

userRouter.get('/getUserInfos',userController.userInfos)
module.exports = userRouter
