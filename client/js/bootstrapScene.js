export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })

        console.log("Start from bootstrap");

        //TODO:Connect to server
    }

    create()
    {
        this.scene.start('testScene')
    }
}
