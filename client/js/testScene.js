import FullscreenButton from './fullscreenButton.js'

export default class mainScene extends Phaser.Scene {
    constructor() {
        super("testScene");
    }

    init({ socket }) {
        this.socket = socket;

        console.log(socket);
    }

    preload() {
        this.load.spritesheet('fullscreen', '../assets/fullscreen.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image('card', '../assets/test.png');
    }

    create() {
        FullscreenButton(this);

        this.sprite = this.add.sprite(500, 500, 'card');
        this.sprite.setInteractive({ draggable: true });

        this.socket.on("newPosition", (pos) => {
            console.log("new pos");

            this.sprite.x = pos.data.posX;
            this.sprite.y = pos.data.posY;
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;

            this.socket.emit("position", {
                posX: this.sprite.x,
                posY: this.sprite.y
            });
        });
    }

    async update() {

    }
}

export { mainScene }