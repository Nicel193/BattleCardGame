const cardOffsetY = -40;
const cardSize = 0.15;

export default class HandCardView {
    constructor(scene) {
        this.scene = scene;
        this.cards = [];
    }

    add() {
        var card = this.scene.add.sprite(0, 0, 'card');
        card.setScale(cardSize);
        card.setOrigin(0.5, 0.5);
        card.setInteractive({ draggable: true });
        card.index = this.cards.length;

        this.cards.push({
            cardObject: card,
            targetPositionX: 0,
            targetPositionY: 0,
            targetAngle: 0
        });

        this.calculateCardsPosition();
        this.draw();
    }

    addObj(cardObject)
    {
        this.cards.push({
            cardObject: cardObject,
            targetPositionX: 0,
            targetPositionY: 0,
            targetAngle: 0
        });

        this.calculateCardsPosition();
        this.draw();
    }

    remove(cardObject) {
        if(this.cards.length <= 0) return;

        this.cards = this.cards.filter(function (element, index) {
            return element.cardObject !== cardObject;
        });

        this.calculateCardsPosition();
        this.draw();
    }

    calculateCardsPosition() {
        var centerX = this.scene.cameras.main.centerX;
        var centerY = this.scene.cameras.main.height;
        var cardWidth = ((this.scene.textures.getFrame('card').width / 2) * cardSize);
        var totalCardsWidth = cardWidth * (this.cards.length - 1);

        for (var i = 0; i < this.cards.length; i++) {
            var newTargetPosition = centerX + (cardWidth * i) - (totalCardsWidth / 2);

            this.cards[i].targetAngle = this.calculateCardAngle(i);
            this.cards[i].targetPositionX = newTargetPosition;
            this.cards[i].targetPositionY = centerY -
                (this.alwaysMinus(this.cards[i].targetAngle) * 4) + cardOffsetY;
        }
    }

    calculateCardAngle(index) {
        var t;

        switch (this.cards.length) {
            case 0:
                t = 0;
                break;
            case 1:
                t = 1;
                break;
            default:
                t = 1 / (this.cards.length - 1) * 2;
                break;
        }

        var anglePos = -1 + (index * t);
        var angleInRadians = Math.atan2(1, anglePos / 4);
        var angleInDegrees;
        switch (this.cards.length) {
            case 0:
                angleInDegrees = 0;
                break;
            case 1:
                angleInDegrees = (155 / Math.PI) * angleInRadians;
                break;
            default:
                angleInDegrees = (180 / Math.PI) * angleInRadians;
                break;
        }

        return -angleInDegrees + 90;
    }

    draw() {
        this.cards.forEach(element => {
            this.scene.tweens.add({
                targets: element.cardObject,
                x: element.targetPositionX,
                y: element.targetPositionY,
                angle: element.targetAngle,
                ease: 'sine',
                duration: 1000
            });
        });
    }

    alwaysMinus(number) {
        if (number > 0) number *= -1;

        return number;
    }
}