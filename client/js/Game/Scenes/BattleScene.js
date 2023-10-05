import FullscreenButton from '../fullscreenButton.js'
import CardInputController from '../Card/CardInputController.js'
import TimerView from '../TimerView.js'
import Player from '../Player/Player.js';
import CreateBackground from './Background.js';

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
        this.player = new Player(this, this.socket);
        this.cardHandler = new CardInputController(this, this.player);
        this.TimerView = new TimerView(this);
        
        CreateBackground(this);
        FullscreenButton(this);
    }

    onTimerComplete() {
        console.log('Таймер завершен. Выполняем ивент!');
    }
}