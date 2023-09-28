export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })

        console.log("Start from bootstrap");

        const socket = io();

        socket.on("connect", () => {
            this.scene.start('testScene', { socket: socket })
        });
    }
}
