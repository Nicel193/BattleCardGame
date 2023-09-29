const uuid = require('uuid');

class Lobby {
    constructor(io) {
        this.io = io;
        this.lobbyId = uuid.v4();
        this.players = {};
    }

    join(playerId, socket) {
        console.log('player [' + playerId + '] joined to lobby [' + this.lobbyId + ']');
        socket.join(this.lobbyId);
        this.players[playerId] = {
            x: 500,
            y: 500,
            playerId: playerId,
        };

        socket.on("position", (data) => {
            socket.broadcast.to(this.lobbyId).emit("newPosition", { data });
        });

        socket.on('disconnect', () => {
            delete this.players[playerId]
            this.io.emit('playerDisconnected', socket.id)
        })
    }
}

module.exports = Lobby;