import FullscreenButton from '../fullscreenButton.js'
import CardInputController from '../Card/CardInputController.js'
import TimerView from '../TimerView.js'
import Player from '../Player/Player.js';

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
        this.load.image('Elements', '../assets/Elements.png');
        this.load.script('VT323', '../assets/VT323-Regular.ttf');
    }

    create() {
        this.player = new Player(this, this.socket);
        this.cardHandler = new CardInputController(this, this.player);
        this.TimerView = new TimerView(this);
        
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

    onTimerComplete() {
        console.log('Таймер завершен. Выполняем ивент!');
    }
}

const CreateBackground = scene => {
    const sceneWidth = scene.sys.game.config.width;
    const sceneHeight = scene.sys.game.config.height;
    const background = scene.add.image(0, 0, 'backgroundImg').setOrigin(0, 0);
    background.setScale(sceneWidth / background.width, sceneHeight / background.height);
    background.setDepth(-1);
}