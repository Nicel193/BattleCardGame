<<<<<<< HEAD:client/js/Game/Scenes/PauseScene.js
export default class PauseScene extends Phaser.Scene {
=======
import CreateBackground from './Background.js';

export default class MenuScene extends Phaser.Scene {
>>>>>>> faba95f37102ad65a0876862d451b461f11c64c2:client/js/Game/Scenes/MenuScene.js
    constructor() {
        super("PauseScene");
    }

    init({ socket }) {
        this.socket = socket;
    }

    preload() {
        this.load.image('backgroundImg', '../assets/GameBackground.png');
    }

    create() {
        CreateBackground(this);

        const playButton = this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Play",
            {
                fontSize: "32px",
                fill: "#fff"
            }
        );
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.scene.start("BattleScene", { socket: this.socket });
        });

        const settingsButton = this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 50,
            'Settings',
            {
                fontSize: '32px',
                fill: '#ffffff'
            }
        );
        settingsButton.setOrigin(0.5);
        settingsButton.setInteractive();
        settingsButton.on('pointerdown', () => {
            this.scene.start('SettingsScene');
        });
    }
}
