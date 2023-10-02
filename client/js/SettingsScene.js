import SoundSettings from './SoundSettings.js'; 

export default class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    create() {
        this.soundSettings = new SoundSettings();

        this.add.text(
            this.sys.game.config.width / 2,
            50,
            'Settings',
            {
                fontSize: '32px',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);

        this.createVolumeControls();

        const backButton = this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height - 50,
            'Назад',
            {
                fontSize: '24px',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);

        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }

    createVolumeControls() {
        this.add.text(
            150,
            150,
            {
                fontSize: '24px',
                fill: '#ffffff'
            }
        );

        const musicVolumeSlider = this.add
            .slider(350, 150, 200, 0, 1, this.soundSettings.getMusicVolume())
            .setOrigin(0)
            .on('valuechange', (value) => {
                this.soundSettings.setMusicVolume(value);
            });

        this.add.text(
            150,
            250,
            'Sound effects volume',
            {
                fontSize: '24px',
                fill: '#ffffff'
            }
        );

        const sfxVolumeSlider = this.add
            .slider(350, 250, 200, 0, 1, this.soundSettings.getSfxVolume())
            .setOrigin(0)
            .on('valuechange', (value) => {
                this.soundSettings.setSfxVolume(value);
            });
    }
}
