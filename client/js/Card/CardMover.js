import HandCardView from './HandCardView.js'
import TableCardView from './TableCardView.js'

export default class CardMover {
    constructor(scene) {
        this.cards = [];
        this.handCardView = new HandCardView(scene);
        this.tableCardView = new TableCardView(scene);

        const button = new Button(100, 50, 'Add card', scene, () => this.tableCardView.add());
        const button2 = new Button(100, 100, 'Remove card', scene, () => this.tableCardView.remove(0));

        const zone = scene.add.zone(640, scene.cameras.main.centerY, 650, 200).setRectangleDropZone(650, 200);

        const graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffffff);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

        scene.input.on('dragenter', (pointer, gameObject, dropZone) => {
            graphics.clear();
            graphics.lineStyle(2, 0x00ffff);
            graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

        });

        scene.input.on('dragleave', (pointer, gameObject, dropZone) => {
            graphics.clear();
            graphics.lineStyle(2, 0xffff00);
            graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

        });

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;

            scene.tweens.add({
                targets: gameObject,
                angle: 0,
                ease: 'sine',
                duration: 500
            });
        });

        // // Добавляем обработчик события 'dragend'
        // sprite.on('dragend', function () {
        //     // Здесь можно добавить логику после завершения перетаскивания
        // });
    }
}

class Button {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}