import CreateBackground from './Background.js';

export default class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LobbyScene' });
        this.dotCount = 0;
    }

    create() {
        CreateBackground(this);

        this.waitingPlayerText = this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Waiting Player",
            {
                font: "32px VT323",
                fill: "#fff"
            }
        );

        this.waitingPlayerText.setOrigin(0.5, 0.5);

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.dotCount = (this.dotCount + 1) % 4;
                const dots = '.'.repeat(this.dotCount);
                this.waitingPlayerText.setText('Waiting Player' + dots);
            }
        });
    }
}