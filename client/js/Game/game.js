import BootstrapScene from './Scenes/BootstrapScene.js'
import BattleScene from './Scenes/BattleScene.js'
import PauseScene from './Scenes/MenuScene.js'
import SettingsScene from './Scenes/LobbyScene.js'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
      },
    scene: [BootstrapScene, PauseScene, BattleScene, SettingsScene]
};

const game = new Phaser.Game(config);