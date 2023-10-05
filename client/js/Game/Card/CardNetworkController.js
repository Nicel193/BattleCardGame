import TableCardView from './TableCardView.js'

export default class CardNetworkController {
    constructor(scene, soket)
    {
        this.tableCardView = new TableCardView(scene);

        socket.on("enemyAddCard", () => {
            this.tableCardView.tryAdd();

            var card = this.scene.add.sprite(0, 0, 'card');
            card.setScale(cardSize);
            card.setOrigin(0.5, 0.5);


        });

        socket.on("enemyRemoveCard", () => {

        });
    }
}