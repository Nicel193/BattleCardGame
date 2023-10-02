import FullscreenButton from './fullscreenButton.js'
import CardInputController from './Card/CardInputController.js'
import Timer from './Timer.js'

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super("BattleScene");
    }

    init({ socket }) {
        this.socket = socket;
    }

    preload() {
        this.load.spritesheet('fullscreen', '../assets/fullscreen.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image('card', '../assets/Card.png');
        this.load.image('backgroundImg', '../assets/GameBackground.png');
    }

    create() {
        this.cardHandler = new CardInputController(this);
        this.timer = new Timer(this, 30, this.onTimerComplete);
        
        CreateBackground(this);
        FullscreenButton(this);
        // this.sprite = this.add.sprite(500, 500, 'card');
        // this.sprite.setInteractive({ draggable: true });

        // this.socket.on("newPosition", (pos) => {
        //     this.sprite.x = pos.data.posX;
        //     this.sprite.y = pos.data.posY;
        // });

        // this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;

        //     this.socket.emit("position", {
        //         posX: this.sprite.x,
        //         posY: this.sprite.y
        //     });
        // });
    }

    update() {
        this.timer.update();
    }

    onTimerComplete() {
        console.log('Таймер завершен. Выполняем ивент!');
    }
}

const CreateBackground = scene => {
    const sceneWidth = scene.sys.game.config.width;
    const sceneHeight = scene.sys.game.config.height;
    const background = scene.add.image(0, 0, 'backgroundImg').setOrigin(0, 0);
    background.setScale(sceneWidth / background.width, sceneHeight / background.height);
}