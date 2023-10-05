import BattleScene from './Scenes/BattleScene.js'
import BootstrapScene from './Scenes/BootstrapScene.js'
import PauseScene from './Scenes/PauseScene.js'
import SettingsScene from './Scenes/SettingsScene.js'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
      },
    scene: [PauseScene, BootstrapScene, BattleScene, SettingsScene]
};

const game = new Phaser.Game(config);