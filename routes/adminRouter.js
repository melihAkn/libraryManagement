const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controller/adminController')

adminRouter.get('/login',adminController.adminLogin);
adminRouter.post('/login')

adminRouter.get('/',adminController.adminPage);


module.exports = adminRouter
