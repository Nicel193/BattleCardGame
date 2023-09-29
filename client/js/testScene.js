import FullscreenButton from './fullscreenButton.js'

export default class mainScene extends Phaser.Scene {
    constructor() {
        super("testScene");
        // this.cards = [];
    }

    init({ socket }) {
        this.socket = socket;
    }

    preload() {
        this.load.spritesheet('fullscreen', '../assets/fullscreen.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        const containerX = this.sys.game.config.width / 2;
        const containerY = this.sys.game.config.height - 100; // Позиция снизу экрана
        this.cardContainer = this.add.container(containerX, containerY);
        this.add.existing(this.cardContainer);

        // Загрузите текстуру карты
        this.load.image('card', '../assets/card.jpg');
    }

    create() {
        FullscreenButton(this);

        // this.sprite = this.add.sprite(500, 500, 'card');
        // this.sprite.setInteractive({ draggable: true });

        // this.socket.on("newPosition", (pos) => {
        //     this.sprite.x = pos.data.posX;
        //     this.sprite.y = pos.data.posY;
        // });

        // this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;

        //     this.socket.emit("position", {
        //         posX: this.sprite.x,
        //         posY: this.sprite.y
        //     });
        // });

        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.height;

        var cardSize = 0.2;
        var numCards = 5;
        var totalWidth = 0;
        for (var i = 1; i < numCards; i++) {
            totalWidth += (this.textures.getFrame('card').width * cardSize);
        }

        for (var i = 0; i < numCards; i++) {
            var card = this.add.sprite(0, 0, 'card');
            card.setScale(cardSize);
            card.setOrigin(0.5, 0.5);

            var targetPosition = centerX + ((card.width * cardSize) * i) - (totalWidth / 2);

            this.tweens.add({
                targets: card,
                x: targetPosition,
                y: centerY,
                ease: 'sine',
                duration: 1000,
                delay: i * 200
            });
        }
    }

    async update() {
    }
}

export { mainScene }