import TableCardView from './TableCardView.js'
import { CardBuilder } from './CardBuilder.js'

export default class CardNetworkController {
    constructor(scene, socket) {
        this.tableCardView = new TableCardView(scene);

        socket.on("enemyAddCard", () => {
            this.tableCardView.tryAdd(CardBuilder(scene));
        });

        socket.on("enemyRemoveCard", () => {
            this.tableCardView.removePop();
        });
    }
}