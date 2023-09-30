import FullscreenButton from './fullscreenButton.js'
import CardMover from './Card/CardMover.js'
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
        this.load.image('card', '../assets/card.jpg');
    }

    create() {
        this.cardHandler = new CardMover(this);
        this.timer = new Timer(this, 30, this.onTimerComplete);
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
        // Этот код выполняется после завершения таймера (через 30 секунд)
        console.log('Таймер завершен. Выполняем ивент!');

        // Здесь вы можете вызвать любое событие или функцию, которую хотите выполнить после истечения времени
    }
}