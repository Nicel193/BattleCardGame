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

        // this.socket.on("newPosition", (data) => {
        //     this.sprite.x = data.posX;
        //     this.sprite.y = data.posY;
        // });

        this.input.on('dragstart', function (pointer, gameObject) {
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', function (pointer, gameObject) {
        });
    }

    update() {
        this.socket.emit("position", {
            posX: this.sprite.x,
            posY: this.sprite.y
        });
    }
}

export { mainScene }