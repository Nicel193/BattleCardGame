export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }
    preload() {
        this.load.image('backgroundImgMenu', '../assets/7test.jpg');
    }
    create() {
        const sceneWidth = this.sys.game.config.width;
        const sceneHeight = this.sys.game.config.height;
        const background = this.add.image(0, 0, 'backgroundImgMenu').setOrigin(0, 0);
        background.setScale(sceneWidth / background.width, sceneHeight / background.height); 
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
            this.scene.start("BootScene");
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
