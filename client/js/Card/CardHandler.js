import CardView from './CardView.js'

export default class CardHandler {
    constructor(scene) {
        this.cards = [];
        this.cardView = new CardView(scene);

        const textButton = scene.add.text(400, 300, 'Add card', { fontSize: '32px', fill: '#fff' })
            .setInteractive() // Делаем текст интерактивным
            .on('pointerdown', () => {
                this.cardView.add();
            });

        // Устанавливаем точку вращения в центр текста
        textButton.setOrigin(0.5);

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