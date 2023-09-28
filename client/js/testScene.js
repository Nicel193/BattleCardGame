import FullscreenButton from './fullscreenButton.js'

export default class mainScene extends Phaser.Scene {
    constructor() {
        super("testScene")
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

        this.add.sprite(500, 500, 'card').setInteractive({ draggable: true });

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

    }
}

export { mainScene }