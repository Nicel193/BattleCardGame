export default class mainScene extends Phaser.Scene {
    constructor() {
        super("testScene")
    }

    preload() {
        this.load.image('card', '../assets/test.png');
    }

    create() {
        this.add.sprite(400, 300, 'card');
    }

    update() {

    }
}

export { mainScene }