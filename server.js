const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http')
const socket = require('socket.io');
const SocketHandler = require('./server/SocketHandler');

const port = 8080
const app = express();
const server = http.createServer(app)
const io = new socket.Server();

app.use(cors())
app.use(express.static(path.join(__dirname, 'client')));

io.attach(server);
socketHandler = new SocketHandler(io);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './client/views/game.html'));
    // res.sendFile(path.join(__dirname, './client/views/registration.html'));
});

server.listen(port, () => {
    console.log('Express is listening on http://localhost:' + port)
})

