import FullscreenButton from '../fullscreenButton.js'
import CardInputController from '../Card/CardInputController.js'
import TimerView from '../TimerView.js'
import Player from '../Player/Player.js';
import CreateBackground from './Background.js';
import CardNetworkController from '../Card/CardNetworkController.js';

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
        this.load.image('card', '../assets/Cards/heal/Card_heal_2.png');
        this.load.image('backgroundImg', '../assets/GameBackground.png');
        this.load.image('icon', '../assets/');
    }

    create() {
        this.player = new Player(this, this.socket);
        this.cardInputController = new CardInputController(this, this.socket, this.player);
        this.cardNetworkController = new CardNetworkController(this, this.socket);
        this.TimerView = new TimerView(this);

        CreateBackground(this);
        FullscreenButton(this);

        this.socket.on("lobbyDeleted", () => this.scene.start("MenuScene", { socket: this.socket }));
    }

    onTimerComplete() {
        console.log('Таймер завершен. Выполняем ивент!');
    }
}