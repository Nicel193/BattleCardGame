import HandCardView from './HandCardView.js'
import TableCardView from './TableCardView.js'

export default class CardMover {
    constructor(scene) {
        const self = this;
        this.cards = [];
        this.handCardView = new HandCardView(scene);
        this.tableCardView = new TableCardView(scene);

        Button(100, 50, 'Add card', scene, () => this.handCardView.add());
        Button(100, 100, 'Remove card', scene, () => this.handCardView.remove(0));

        scene.input.on('dragstart', function (pointer, gameObject) {
            scene.tweens.add({
                targets: gameObject,
                angle: 0,
                ease: 'sine',
                duration: 500
            });
        });

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        scene.input.on('dragend', function (pointer, gameObject) {
            self.handCardView.remove(0);

            if (gameObject.isHandCard === false && gameObject.isLeaveFromZone === true) {
                self.handCardView.addObj(gameObject);
            }
        });

        CreateTableZone(scene, this.tableCardView, this.handCardView);
    }
}

const CreateTableZone = function (scene, tableCardView, handCardView) {
    const colorInZone = 0xffffff;
    const colorOutZone = 0x836942;
    const zone = scene.add.zone(640, scene.cameras.main.centerY, 650, 200).setRectangleDropZone(650, 200);
    const graphics = scene.add.graphics();

    SetZoneColor(colorOutZone);

    scene.input.on('dragenter', (pointer, gameObject, dropZone) => {
        gameObject.isLeaveFromZone = false;
        tableCardView.remove(gameObject);

        SetZoneColor(colorInZone);
    });

    scene.input.on('dragleave', (pointer, gameObject, dropZone) => {
        gameObject.isLeaveFromZone = true;

        SetZoneColor(colorOutZone);
    });

    scene.input.on('drop', function (pointer, gameObject, dropZone) {
        if (dropZone == zone) {
            if (tableCardView.tryAdd(gameObject)) {
                handCardView.remove(gameObject);
            }
        }

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