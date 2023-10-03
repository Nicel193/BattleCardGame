const maxCardsInHand = 6;

export default class CardHandler {
    constructor(handCardView, tableCardView) {
        this.tableCards = [];
        this.handCards = [];

        this.handCardView = handCardView;
        this.tableCardView = tableCardView;

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                this.handCardView.add();

            }, 200 * i);
        }
    }

    addToTable(cardObject) {
        if (this.tableCardView.tryAdd(cardObject)) {
            this.handCardView.remove(cardObject);
        }
    }

    removeFromTable(cardObject) {
        this.tableCardView.remove(cardObject);
    }

    returnToHand(cardObject) {
        this.handCardView.remove(0);

        if (cardObject.isHandCard === false && cardObject.isLeaveFromZone === true) {
            this.handCardView.addObj(cardObject);
        }
    }
}