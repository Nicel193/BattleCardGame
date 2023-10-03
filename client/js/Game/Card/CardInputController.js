import HandCardView from './HandCardView.js'
import TableCardView from './TableCardView.js'
import CardHandler from './CardHandler.js'

export default class CardInputController {
    constructor(scene, player) {
        const self = this;
        this.cards = [];
        this.handCardView = new HandCardView(scene);
        this.tableCardView = new TableCardView(scene);
        this.cardHandler = new CardHandler(this.handCardView, this.tableCardView);

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (player.isActivePlayer === false) return;

            gameObject.x = dragX;
            gameObject.y = dragY;

            scene.tweens.add({
                targets: gameObject,
                angle: 0,
                ease: 'sine',
                duration: 500
            });
        });

        scene.input.on('dragend', (pointer, gameObject) => {
            this.cardHandler.returnToHand(gameObject);
        });

        CreateTableZone(scene, player, this.cardHandler);
    }
}

const CreateTableZone = function (scene, player, cardHandler) {
    const colorInZone = 0xffffff;
    const colorOutZone = 0x836942;
    const zone = scene.add.zone(640, scene.cameras.main.centerY, 650, 200).setRectangleDropZone(650, 200);
    const graphics = scene.add.graphics();

    SetZoneColor(colorOutZone);

    scene.input.on('dragenter', (pointer, gameObject, dropZone) => {
        gameObject.isLeaveFromZone = false;
        cardHandler.removeFromTable(gameObject);

        SetZoneColor(colorInZone);
    });

    scene.input.on('dragleave', (pointer, gameObject, dropZone) => {
        gameObject.isLeaveFromZone = true;

        SetZoneColor(colorOutZone);
    });

    scene.input.on('drop', function (pointer, gameObject, dropZone) {
        if (player.isActivePlayer === false) return;

        cardHandler.addToTable(gameObject);

        SetZoneColor(colorOutZone);
    });

    function SetZoneColor(color) {
        graphics.clear();
        graphics.lineStyle(2, color);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    }
}

const Button = function Button(x, y, label, scene, callback) {
    const button = scene.add.text(x, y, label)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => callback())
        .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
}