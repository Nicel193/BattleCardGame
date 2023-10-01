const cardSize = 0.15;
const maxCards = 5;

export default class TableCardView {
    constructor(scene) {
        this.scene = scene;
        this.cards = [];
    }

    add()
    {
        if(this.cards.length >= maxCards) return;

        var card = this.scene.add.sprite(0, 0, 'card');
        card.setScale(cardSize);
        card.setOrigin(0.5, 0.5);
        card.setInteractive({ draggable: true });

        this.cards.push({
            cardObject: card,
            targetPositionX: 0,
            targetPositionY: 0
        });

        this.calculateCardsPosition();
        this.draw();
    }

    remove(indexRemove) {
        if(this.cards.length <= 0) return;
        
        this.cards[indexRemove].cardObject.destroy();
        console.log(this.cards[indexRemove]);

        this.cards = this.cards.filter(function (element, index) {
            return index !== indexRemove;
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