const server = require('socket.io')
const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

io.on('connection',(socket)=>{
    console.log('New connection',socket.id)
})

export {app,io,server}