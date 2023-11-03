//necessary packages
const express = require('express')
const expHbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
//router files
const indexRouter = require('./routes/indexRouter')
const adminRouter = require('./routes/adminRouter')
const userRouter = require('./routes/userRouter')
//app start
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'))
//route and template engine settings
app.use('/',indexRouter)
app.use('/admin',adminRouter)
app.use('/user',userRouter)
app.use(cookieParser())
app.use(express.static('public'))

app.engine('handlebars', expHbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.set('view options', { layout: 'indexNavBar' })
// MongoDB connect and config
const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(`${connectionString}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("connection is success"))
  .catch(e => { console.log(e)})
//server start
app.listen('3000', _ => {
    console.log('server start')
})