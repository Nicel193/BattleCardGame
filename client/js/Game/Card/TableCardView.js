const maxCards = 5;
const cardSize = 1.2;

import { cardWidth } from './CardBuilder.js'

export default class TableCardView {
    constructor(scene) {
        this.scene = scene;
        this.cardsGroup = scene.add.layer();
        this.cards = [];

        this.cardsGroup.setDepth(10);
    }

    tryAdd(cardObject) {
        if (this.cards.length >= maxCards) return false;

        cardObject.isHandCard = false;

        this.cardsGroup.add(cardObject);
        this.cards.push({
            cardObject: cardObject,
            targetPositionX: 0,
            targetPositionY: 0
        });

        this.calculateCardsPosition();
        this.draw();

        return true
    }

    removePop() {
        if (this.cards.length <= 0) return;

        this.scene.tweens.add({
            targets: this.cards[this.cards.length - 1].cardObject,
            x: -100,
            y: -100,
            ease: 'sine',
            duration: 1000
        });
        
        this.cards.pop();
        this.calculateCardsPosition();
        this.draw();
    }

    remove(cardObject) {
        if (this.cards.length <= 0) return;
        cardObject.setDepth(this.cards.length);

        this.cards = this.cards.filter(function (element, index) {
            return element.cardObject !== cardObject;
        });

        this.calculateCardsPosition();
        this.draw();
    }

    calculateCardsPosition() {
        var centerX = this.scene.cameras.main.centerX;
        var centerY = this.scene.cameras.main.centerY;
        var width = cardWidth(this.scene);
        var totalCardsWidth = width * (maxCards - 1);

        for (var i = 0; i < this.cards.length; i++) {
            var newTargetPosition = centerX + (width * i) - (totalCardsWidth / 2);

            this.cards[i].targetPositionX = newTargetPosition;
            this.cards[i].targetPositionY = centerY;
            this.cards[i].cardObject.setDepth(i);
        }
    }

    draw() {
        this.cards.forEach(element => {
            this.scene.tweens.add({
                targets: element.cardObject,
                x: element.targetPositionX,
                y: element.targetPositionY,
                ease: 'sine',
                duration: 1000
            });
        });
    }
}