const express = require('express')
const indexRouter = express.Router()

const indexController = require('../controller/indexController')
const layoutSet = require('../middleware/pagesLayoutSet')
indexRouter.use(layoutSet.indexPageLayout)
indexRouter.get('/',indexController.index)
indexRouter.get('/about',indexController.about)
indexRouter.get('/contact',indexController.contact)
indexRouter.get('/searchBooks',indexController.searchBooks)
indexRouter.get('/getBooks/:name?',indexController.getBooks)



module.exports = indexRouter





