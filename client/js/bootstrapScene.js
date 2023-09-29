export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })

        console.log("Start from bootstrap");

        this.socket = io('http://localhost:8080');

        this.socket.on("connect", () => {
            const text = this.add.text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                'Waiting for the second player...',
                { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

            text.setOrigin(0.5, 0.5);
            text.setFontSize(30);

            this.scene.start('testScene', { socket: this.socket });

            // this.socket.on("startBattle", (users) => {
            //     console.log(users);
            //     // this.scene.start('testScene', { socket: this.socket })

            // });
        });
    }
}
