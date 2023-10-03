import PlayerView from './PlayerView.js'

export default class Player {
    constructor(socket) {
        this.health = 30;
        this.mana = 20;
        this.playerView = new PlayerView();

        socket.emit("joinedToBattle");

        socket.on("startBattle", (playerData) => {
            console.log(playerData);

            this.isActivePlayer = playerData.isActivePlayer;
            this.playerId = playerData.playerId;
        });
    }

    damage(damage) {
        if (damage > 0) this.health -= damage;

        this.playerView.drawHealth();
    }

    heal(heal) {
        if (heal > 0) this.health += heal;

        this.playerView.drawHealth();
    }

    addMana(mana) {
        this.playerView.drawMana();
    }

    removeMana(mana) {
        this.playerView.drawMana();
    }
}