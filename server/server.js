const express = require('express')
const app = express()
const http = require('http')
const socketIO = require('socket.io')
const path = require('path')
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

let server = http.createServer(app)

// configure to use SocketIO - io will be the web socket server
let io = socketIO(server)

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)

    // emit the new message
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server is listening on port ${port}...`))