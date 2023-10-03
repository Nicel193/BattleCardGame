const uuid = require('uuid');
const Timer = require('./Game/Timer.js');
const maxPlayers = 2;

class Lobby {
    constructor(io) {
        this.io = io;
        this.lobbyId = uuid.v4();
        this.players = [];

        this.timer = new Timer(io, this.lobbyId);
    }

    join(playerId, socket) {
        console.log('player [' + playerId + '] joined to lobby [' + this.lobbyId + ']');
        socket.join(this.lobbyId);

        this.players.push({
            playerId: playerId,
            isActivePlayer: this.players.length == 0
        });

        if (this.players.length == maxPlayers) this.timer.startTimer();
        
        socket.on("canStartBattle", () => {
            socket.emit("startBattle", { users: this.players.length });
            socket.to(this.lobbyId).emit("startBattle", { users: this.players.length });
        });

        socket.on("position", (data) => {
            socket.broadcast.to(this.lobbyId).emit("newPosition", { data });
        });

        socket.on('disconnect', () => {
            if (socket.id != playerId) return;

            this.players = this.players.filter(function (element, index) {
                return element.playerId !== playerId;
            });
            socket.to(this.lobbyId).emit('playerDisconnected', socket.id);
        });

        socket.on('joinedToBattle', () => {
            socket.emit("startBattle", this.players[this.players.length - 1]);
        });
    }

    lobbyIsFull() {
        return this.players.length >= maxPlayers;
    }

}

module.exports = Lobby;