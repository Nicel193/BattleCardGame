import BattleScene from './BattleScene.js'
import bootstrapScene from './bootstrapScene.js'
import MenuScene from './MenuScene.js'
import SettingsScene from './SettingsScene.js'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
      },
    scene: [MenuScene, bootstrapScene, BattleScene, SettingsScene]
};

const game = new Phaser.Game(config);