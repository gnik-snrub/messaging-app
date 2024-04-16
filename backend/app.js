const apiRouter = require('./routes/api');
const chatHandler = require('./sockets/chat');

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

const { Server } = require('socket.io')

const server = require('http').createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})
chatHandler(io)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter)

server.listen(process.env.PORT, () => {console.log(`Listening on port ${process.env.PORT}`)})

module.exports = app;
