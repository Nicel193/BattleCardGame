const uuid = require('uuid');
const Timer = require('./Timer.js');
const maxPlayers = 2;

class Lobby {
    constructor(io, removeLobbyCallback) {
        this.io = io;
        this.lobbyId = uuid.v4();
        this.players = [];
        this.removeLobbyCallback = removeLobbyCallback;

        this.timer = new Timer(io, this.lobbyId);

        console.log('Lobby created with id [' + this.lobbyId + ']');
    }

    join(playerId, socket) {
        console.log('player [' + playerId + '] joined to lobby [' + this.lobbyId + ']');
        socket.join(this.lobbyId);

        this.players.push({
            playerId: playerId,
            isActivePlayer: this.players.length == 0
        });

        if (this.lobbyIsFull()) {
            this.io.to(this.lobbyId).emit("startBattle");

            this.timer.startTimer();
        }

        socket.on('joinedToBattle', () => {
            const player = this.players.find(player => player.playerId === socket.id);
            socket.to(this.lobbyId).emit("startCardBattle", player);
        });

        socket.on('addCard', () => {
            socket.broadcast.to(this.lobbyId).emit("enemyAddCard");
        });

        socket.on('removeCard', () => {
            socket.broadcast.to(this.lobbyId).emit("enemyRemoveCard");
        });

        socket.on('disconnect', () => {
            if (socket.id == playerId) {
                this.io.to(this.lobbyId).emit('lobbyDeleted', socket.id);
                this.removeLobbyCallback();
            }
        });
    }

    lobbyIsFull() {
        return this.players.length >= maxPlayers;
    }

}

module.exports = Lobby;