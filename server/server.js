import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const socketio = http.createServer(app)
const port = process.env.PORT || 8000
const io = new Server(socketio, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  socket.on('push_message', (message) => {
    console.log(message)
    socket.broadcast.emit('pull_message', message)
  })

  socket.on('new_user', (user) => {
    console.log('new user', user)
  })


})

socketio.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})