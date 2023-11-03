const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controller/adminController')


const layoutSet = require('../middleware/pagesLayoutSet')
adminRouter.use(layoutSet.adminPageLayout)

adminRouter.get('/login',adminController.adminLogin);
adminRouter.post('/login')

adminRouter.get('/',adminController.adminPage);


module.exports = adminRouter
