import rng from "./rng";

export const Sounds = {
    spray:0,
    hit:1,
    throw:2,
    thud:3,
    // boxstop:3
}

export class SoundfxPlayer{
    constructor() {
        this.initialized = false;          
        this.currentSfxIndex =0;
        this.audiopool = [];
        this.pannerNodes = [];
    }

    initAudio() {
        if (this.audioContext) return;
        this.initialized = true;
        this.sounds= [
            new Audio('sfx/spray.wav'),
            [new Audio('sfx/hit1.mp3'),new Audio('sfx/hit2.mp3'),new Audio('sfx/hit3.mp3')],
            [new Audio('sfx/throw1.mp3'),new Audio('sfx/throw2.mp3'),new Audio('sfx/throw3.mp3')],
            [new Audio('sfx/thud1.mp3'),new Audio('sfx/thud2.mp3'),new Audio('sfx/thud3.mp3'),new Audio('sfx/thud4.mp3')],
        ];

        this.audioContext = new AudioContext();
        this.audioContext.listener.upY.value = 1;        
        let gain = this.audioContext.createGain();
        gain.connect(this.audioContext.destination);
        
        for (let i = 0; i < 25; i++) {
            const audio = new Audio();                        
            this.audiopool.push(audio);
            const element = this.audioContext.createMediaElementSource(audio);
            
            const pn = new PannerNode(this.audioContext, {
                panningModel: 'HRTF',
                distanceModel: 'exponential',
            });

            element.connect(pn);
            pn.connect(gain);
            this.pannerNodes.push(pn);
        }
    }
    
    playSoundLoopStart(audioIndex){        
        if(!this.audioContext || this.loopingIndex ) return;
        
        this.loopingIndex = this.currentSfxIndex;
        this.audiopool[this.loopingIndex].src = this.sounds[audioIndex].src;        
        this.audiopool[this.loopingIndex].loop = true;
        this.audiopool[this.loopingIndex].play();
        this.currentSfxIndex = (this.currentSfxIndex + 1) % 25;
    }

    playSoundLoopEnd(){
        if(!this.audioContext || this.loopingIndex == undefined ) return;
        this.audiopool[this.loopingIndex].currentTime = 0;
        this.audiopool[this.loopingIndex].pause();
        this.audiopool[this.loopingIndex].src = '';
        this.audiopool[this.loopingIndex].loop = false;
        this.loopingIndex = undefined;
    }

    playSound(audioIndex, pos) {
        if(!this.audioContext) return;
        if(!pos || !pos[0] || isNaN(pos[0])){
            pos=[0,0,0];
        }
        
        this.pannerNodes[this.currentSfxIndex].positionX.value = pos[0];
        this.pannerNodes[this.currentSfxIndex].positionY.value = pos[1];
        this.pannerNodes[this.currentSfxIndex].positionZ.value = pos[2];
        const sound = rng.getItem(this.sounds[audioIndex]);
        this.audiopool[this.currentSfxIndex].src = sound.src;        
        this.audiopool[this.currentSfxIndex].play();
        this.currentSfxIndex = (this.currentSfxIndex + 1) % 25;
        if(this.currentSfxIndex == this.loopingIndex){
            this.currentSfxIndex = (this.currentSfxIndex + 1) % 25;
        }
    }
};
