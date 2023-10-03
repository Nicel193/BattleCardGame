export default class PlayerView {
    constructor(scene) {
        this.healthText = scene.add.text(22, scene.cameras.main.height - 54, '', { font: '32px VT323', fill: '#fff' });
        this.manaText = scene.add.text(98, scene.cameras.main.height - 54, '', { font: '32px VT323', fill: '#fff' });
    }

    drawHealth(value) {
        this.healthText.setText(value);
    }

    drawMana(value) {
        this.manaText.setText(value);
    }
}