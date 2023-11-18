const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controller/adminController')


const layoutSet = require('../middleware/pagesLayoutSet')
adminRouter.use(layoutSet.adminPageLayout)

adminRouter.get('/login',adminController.adminLoginPage)
adminRouter.post('/login',adminController.adminLogin)

adminRouter.get('/getUsers',adminController.getUsersPage)
adminRouter.get('/users',adminController.getUsers)

adminRouter.get('/getUserMessages',adminController.getUserMessagesPage)
adminRouter.get("/UserMessages",adminController.getUserMessages)

adminRouter.get('/getCookie',adminController.adminGetCookie)
adminRouter.get('/validToken',adminController.adminValidToken)

adminRouter.get('/',adminController.adminPage)

adminRouter.get('/getBooks/:name?',adminController.getBooks)

adminRouter.delete('/deleteBook/:barcodNo',adminController.deleteBook)


module.exports = adminRouter
