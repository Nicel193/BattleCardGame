import mainScene from './testScene.js'
import bootstrapScene from './bootstrapScene.js'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
      },
    scene: [bootstrapScene, mainScene]
};

const game = new Phaser.Game(config);