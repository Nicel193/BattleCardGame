const Lobby = require('./Game/Lobby.js')

class SocketHandler {
    constructor(io) {
        this.io = io;
        this.connectCounter = 0;
        this.lobby = new Lobby(this.io);
        this.lobby2 = new Lobby(this.io);
        this.setupSocket();
    }

    setupSocket() {
        this.io.on("connection", (socket) => {
            console.log('player [' + socket.id + '] connected')

            this.connectCounter++;

            // if (this.connectCounter > 2) {
                this.lobby.join(socket.id, socket);
            // } else {
            //     this.lobby2.join(socket.id, socket);
            // }

            socket.on('disconnect', () => {
                console.log('player [' + socket.id + '] disconnected');
                this.connectCounter--;
            })
        });
    }
}

module.exports = SocketHandler;