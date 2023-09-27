import mainScene from './testScene.js'

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [mainScene]
};

const game = new Phaser.Game(config);