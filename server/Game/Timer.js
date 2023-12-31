const initRoundTime = 30;

class Timer {
    constructor(io, lobbyId) {
        this.roundTime = initRoundTime;
        this.io = io;
        this.lobbyId = lobbyId;
    }

    startTimer() {
        this.timerId = setInterval(() => {
            if (this.roundTime <= 0) return;

            this.roundTime -= 1;
            this.io.to(this.lobbyId).emit("updateTime", this.roundTime);
        }, 1000);
        
        setTimeout(() => {
            clearInterval(this.timerId);
        }, initRoundTime * 1000);
    }
}

module.exports = Timer;