const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http')
const socket = require('socket.io');
const { log } = require('console');

const port = 3000
const app = express();
const server = http.createServer(app)
const io = new socket.Server();

app.use(cors())
app.use(express.static(path.join(__dirname, 'client')));

io.attach(server);
io.on("connection", (socket) => {
    log("Connected");

    socket.on("position", (data) => {
        socket.emit("newPosition", { data });
        console.log(data);
    });
});

server.listen(port, () => {
    console.log('Express is listening on http://localhost:' + port)
})

