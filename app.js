//necessary packages
const express = require('express')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config();
//router files
const indexRouter = require('./routes/indexRouter')
//app start
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public')); 
//route and template engine settings
app.use('/', indexRouter)
app.use(cookieParser())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

// MongoDB connect and config
const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(`${connectionString}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("baglanti basarili"))
  .catch(e => { console.log(e)});
//server start
app.listen('3000', _ => {
    console.log('server basladi')
})