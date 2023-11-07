const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const pagesLayoutSet = require('../middleware/pagesLayoutSet')
userRouter.use(pagesLayoutSet.userPageLayout)
userRouter.get('/',userController.userPage)


module.exports = userRouter
