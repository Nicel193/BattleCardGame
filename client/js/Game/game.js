import BattleScene from './Scenes/BattleScene.js'
import BootstrapScene from './Scenes/BootstrapScene.js'
import MenuScene from './Scenes/MenuScene.js'
import SettingsScene from './Scenes/SettingsScene.js'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
      },
    scene: [MenuScene, BootstrapScene, BattleScene, SettingsScene]
};

const game = new Phaser.Game(config);