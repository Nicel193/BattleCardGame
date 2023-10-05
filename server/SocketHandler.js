const Lobby = require('./Game/Lobby.js')

class SocketHandler {
    constructor(io) {
        this.io = io;
        this.connectCounter = 0;
        this.lobbies = [];

        this.setupSocket();
    }

    setupSocket() {
        this.io.on("connection", (socket) => {
            console.log('player [' + socket.id + '] connected')

            this.connectCounter++;

            socket.on("joinedToLobby", () => {
                const currentLobby = this.lobbies[this.lobbies.length - 1];

                if (this.lobbies.length == 0 || currentLobby.lobbyIsFull()) {
                    this.createLobby();
                }

                this.lobbies[this.lobbies.length - 1].join(socket.id, socket);
            });

            socket.on('disconnect', () => {
                console.log('player [' + socket.id + '] disconnected');
                this.connectCounter--;
            })
        });
    }

    // Create lobby in array
    createLobby() {
        const lobby = new Lobby(this.io, () => {

            const index = this.lobbies.indexOf(lobby);
            if (index !== -1) {
                this.lobbies.splice(index, 1);
            }
        });
        this.lobbies.push(lobby);
    }
}

module.exports = SocketHandler;