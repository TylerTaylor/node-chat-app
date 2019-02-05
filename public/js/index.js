let socket = io()

socket.on('connect', function () {
  console.log('Connected to server')

  socket.on('createEmail', {
    to: 'jen@example.com',
    text: 'WHAT UP JEN'
  })

  socket.emit('createMessage', {
    from: 'Tyler',
    text: 'Yes indeed'
  })
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
  console.log('newMessage', message)
})
