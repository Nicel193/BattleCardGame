const maxCardsInHand = 6;

export default class CardHandler {
    constructor(handCardView, tableCardView, socket) {
        this.tableCards = [];
        this.handCards = [];

        this.handCardView = handCardView;
        this.tableCardView = tableCardView;
        this.socket = socket;

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                this.handCardView.add();

            }, 200 * i);
        }
    }

    addToTable(cardObject) {
        if (this.tableCardView.tryAdd(cardObject)) {
            this.handCardView.remove(cardObject);
            this.socket.emit("addCard");
        }
    }

    removeFromTable(cardObject) {
        this.tableCardView.remove(cardObject);
    }

    returnToHand(cardObject) {
        this.handCardView.remove(0);

        if (cardObject.isHandCard === false && cardObject.isLeaveFromZone === true) {
            this.handCardView.addObj(cardObject);
            this.socket.emit("removeCard");
        }
    }
}