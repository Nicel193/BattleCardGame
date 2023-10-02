export default class SoundSettings {
    constructor() {
        this.musicVolume = 0.5; 
        this.sfxVolume = 0.5;   
    }

    setMusicVolume(volume) {
        this.musicVolume = volume;
    }

    getMusicVolume() {
        return this.musicVolume;
    }

    setSfxVolume(volume) {
        this.sfxVolume = volume;
    }

    getSfxVolume() {
        return this.sfxVolume;
    }
}
