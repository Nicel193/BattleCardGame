const maxCards = 5;
const cardSize = 0.15;

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
        var cardWidth = ((this.scene.textures.getFrame('card').width) * cardSize);
        var totalCardsWidth = cardWidth * (maxCards - 1);

        for (var i = 0; i < this.cards.length; i++) {
            var newTargetPosition = centerX + (cardWidth * i) - (totalCardsWidth / 2);

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