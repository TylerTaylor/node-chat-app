const express = require('express')
const app = express()
const http = require('http')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')

const path = require('path')
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

let server = http.createServer(app)

// configure to use SocketIO - io will be the web socket server
let io = socketIO(server)

io.on('connection', (socket) => {
  console.log('New user connected')

  // welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  // broadcast to other users that user joined the chat
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)

    // emit the new message
    io.emit('newMessage', generateMessage(message.from, message.text))

    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server is listening on port ${port}...`))