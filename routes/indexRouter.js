const express = require('express')
const indexRouter = express.Router()

const indexController = require('../controller/indexController')
const userController = require('../controller/userController')
const layoutSet = require('../middleware/pagesLayoutSet')
indexRouter.use(layoutSet.indexPageLayout)
indexRouter.get('/',indexController.indexPage)
indexRouter.get('/about',indexController.aboutPage)
indexRouter.get('/contact',indexController.contactPage)
indexRouter.get('/searchBooks',indexController.searchBooksPage)
indexRouter.get('/getBooks/:name?',indexController.getBooks)

indexRouter.get('/userLogin',indexController.userLoginPage)
indexRouter.post('/userLogin',userController.userLogin)

indexRouter.get('/userRegister',indexController.userRegisterPage)
indexRouter.post('/userRegister',userController.userRegister)

indexRouter.get('/getCookie',indexController.getCookie)
indexRouter.get('/validToken',indexController.validToken)

indexRouter.post('/userAddFavoriteAndBorrow/:buttonName',userController.userAddFavoriteAndBorrow)
module.exports = indexRouter





