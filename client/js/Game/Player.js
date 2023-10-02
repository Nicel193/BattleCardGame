import PlayerView from './PlayerView.js'

export default class Player {
    constructor() {
        this.health = 30;
        this.mana = 20;
        this.isActivePlayer = false;
        this.playerView = new PlayerView();
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