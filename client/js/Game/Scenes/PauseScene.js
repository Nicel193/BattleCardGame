export default class PauseScene extends Phaser.Scene {
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
