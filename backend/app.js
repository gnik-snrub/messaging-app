const apiRouter = require('./routes/api');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()

const mongoose = require('mongoose')
const mongoDB = process.env.MONGO_CT_URL

main().catch(err => console.log(err))
async function main() {
  await mongoose.connect(mongoDB)
}

var app = express();

const cors = require('cors')
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter)

app.listen(process.env.PORT, () => {console.log(`Listening on port ${process.env.PORT}`)})

module.exports = app;
