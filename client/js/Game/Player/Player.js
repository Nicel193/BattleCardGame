import PlayerView from './PlayerView.js'

export default class Player {
    constructor(scene, socket) {
        this.health = 30;
        this.mana = 20;
        this.playerView = new PlayerView(scene);

        this.playerView.drawHealth(this.health);
        this.playerView.drawMana(this.mana);

        socket.emit("joinedToBattle");

        socket.on("startBattle", (playerData) => {
            this.isActivePlayer = playerData.isActivePlayer;
            this.playerId = playerData.playerId;
        });
    }

    damage(damage) {
        if (damage > 0) this.health -= damage;

        this.playerView.drawHealth(this.health);
    }

    heal(heal) {
        if (heal > 0) this.health += heal;

        this.playerView.drawHealth(this.health);
    }

    addMana(mana) {
        this.playerView.drawMana(this.mana);
    }

    removeMana(mana) {
        this.playerView.drawMana(this.mana);
    }
}