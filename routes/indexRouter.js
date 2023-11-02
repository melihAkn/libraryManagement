const express = require('express')
const indexRouter = express.Router()

const indexController = require('../controller/indexController')

indexRouter.get('/',indexController.index)
indexRouter.get('/about',indexController.about)
indexRouter.get('/contact',indexController.contact)
indexRouter.get('/searchBooks',indexController.searchBooks)

module.exports = indexRouter





