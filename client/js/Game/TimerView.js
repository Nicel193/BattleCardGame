export default class TimerView {
    constructor(scene, time, callback) {
        this.timeText = scene.add.text(1000, 35, '', { fontSize: '32px', fill: '#fff' });

        scene.socket.on("updateTime", (time) => {
            this.timeText.setText('Time: ' + time);
        });
    }
} 