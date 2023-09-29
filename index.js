const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http')
const socket = require('socket.io');
const { log } = require('console');

const port = 8080
const app = express();
const server = http.createServer(app)
const io = new socket.Server();

var players = {}

app.use(cors())
app.use(express.static(path.join(__dirname, 'client')));

io.attach(server);
io.on("connection", (socket) => {
    console.log('player [' + socket.id + '] connected')

    players[socket.id] = {
      x: 500,
      y: 500,
      playerId: socket.id,
    }

    socket.on('disconnect', function () {
        console.log('player [' + socket.id + '] disconnected')
        delete players[socket.id]
        io.emit('playerDisconnected', socket.id)
      })

    socket.on("position", (data) => {
        socket.broadcast.emit("newPosition", { data });
    });
});

server.listen(port, () => {
    console.log('Express is listening on http://localhost:' + port)
})

