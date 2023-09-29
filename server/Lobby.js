const uuid = require('uuid');
const maxPlayers = 2;

class Lobby {
    constructor(io) {
        this.io = io;
        this.lobbyId = uuid.v4();
        this.players = {};
        this.countActivePlayers = 0;
    }

    join(playerId, socket) {
        console.log('player [' + playerId + '] joined to lobby [' + this.lobbyId + ']');
        socket.join(this.lobbyId);

        this.players[playerId] = {
            x: 500,
            y: 500,
            playerId: playerId,
        };

        socket.on("canStartBattle", () => {
            socket.emit("startBattle", { users: Object.keys(this.players).length });
            socket.to(this.lobbyId).emit("startBattle", { users: Object.keys(this.players).length });
        });

        socket.on("position", (data) => {
            socket.broadcast.to(this.lobbyId).emit("newPosition", { data });
        });

        socket.on('disconnect', () => {
            if (socket.id != playerId) return;

            delete this.players[playerId]
            this.countActivePlayers--;
            socket.to(this.lobbyId).emit('playerDisconnected', socket.id)
        })

        // Проверьте количество клиентов в комнате
        const clientsInRoom = socket.adapter.rooms.get(this.lobbyId);

        // Получите количество клиентов в комнате
        const numberOfClients = clientsInRoom.size;

        console.log(`Количество клиентов в комнате ${this.lobbyId}: ${numberOfClients}`);
    }
}

module.exports = Lobby;