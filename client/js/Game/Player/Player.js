import PlayerView from './PlayerView.js'

export default class Player {
    constructor(scene, socket) {
        this.health = 30;
        this.mana = 20;
        this.armor = 0;
        this.playerView = new PlayerView(scene);

        this.playerView.drawHealth(this.health);
        this.playerView.drawMana(this.mana);

        socket.emit("joinedToBattle");

        socket.on("startCardBattle", (playerData) => {
            this.isActivePlayer = playerData.isActivePlayer;
            this.playerId = playerData.playerId;

            console.log(playerData);
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

    activateArmor(amount) {
        this.armor += amount;
    }

    adddamage(card_one, card_two) {
        this.card_one += card_two;
    }
    applyCard(card) {
        switch (card.type) {
            case 'heal':
                this.heal(card.attribute_score);
                break;
            case 'power up':
                this.adddamage(card_one.attribute_score, card_two.attribute_score);
                break;
            case 'damage':
                this.damage(card.attribute_score);
                break;
            case 'armor':
                this.activateArmor(card.attribute_score);
                break;
            default:
                // Обработка неизвестного типа карты
                break;
        }
    }
}