import CreateBackground from './Background.js';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super("PauseScene");
    }

    init({ socket }) {
        this.socket = socket;
    }

    preload() {
        this.load.image('backgroundImg', '../assets/GameBackground.png');
        this.load.script('VT323', '../assets/VT323-Regular.ttf');
    }

    create() {
        CreateBackground(this);

        const playButton = this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Play",
            {
                font: "32px VT323",
                fill: "#fff"
            }
        );
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.scene.start("LobbyScene", { socket: this.socket });
        });
    }
}
