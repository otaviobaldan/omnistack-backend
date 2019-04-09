const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)

const dotenv = require('dotenv')
dotenv.config()

const io = require('socket.io')(server)

// isola os usuarios de acordo com a box que estão acessando para que recebam atualizações somente daquela box
io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true
})

app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

server.listen(process.env.PORT || 3333, () => {
  console.log('Server listen on ' + process.env.PORT || 3333)
})
