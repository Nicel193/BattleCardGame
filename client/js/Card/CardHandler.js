import CardView from './CardView.js'

export default class CardHandler {
    constructor(scene) {
        this.cards = [];
        this.cardView = new CardView(scene);

        const button = new Button(400, 300, 'Add card', scene, () => this.cardView.add());
        const button2 = new Button(800, 300, 'Remove card', scene, () => this.cardView.remove(0));

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