import { State } from "../classes/gameState";

export const Songs = {
    complete:0,
    gameplay:1,
    title:2
}

export class MusicPlayer{
    constructor() {
        this.initialized = false;                  
    }

    initAudio() {
        if (this.initialized) return;

        this.initialized = true;
        this.songs = [
             new Audio('music/ourhome.mp3'),
            // new Audio('Music/gameplay.mp3'),
            // new Audio('Music/title.mp3')
        ];
        this.currentSong = new Audio();        
        this.currentSong.muted = true;
        this.isPlaying = false;
        this.firstTime = true;
        GetOffMyLawn.gameState.isInVRSubject.subscribe(isInVR => {
            console.log(`Music player: ${isInVR}`)
            if(this.firstTime){
                this.checkState();
                this.firstTime = false;
                return;
            }
            if(!this.isPlaying) return;
            if(isInVR) {
                this.currentSong.play();
            }else{
                this.currentSong.muted = true;
                this.currentSong.pause();
            }
        });

        GetOffMyLawn.gameState.stateSubject.subscribe(() => {
           this.checkState();
        });

    
    }

    checkState(){
        switch(GetOffMyLawn.gameState.state) {
            case State.Title:
                // this.playMusic(Songs.title);
                // break;
            case State.Playing:
                // this.playMusic(Songs.gameplay);
                // break;
            case State.Complete:
                this.playMusic(Songs.complete);
                break;
            default:
                this.currentSong.pause();
                this.isPlaying = false;
                break;
        }
    }

    playMusic(audioIndex) {
        if(!this.initialized || !this.songs[audioIndex]) return;
        this.currentSong.src = this.songs[audioIndex].src;  
        this.currentSong.loop = true;      
        this.currentSong.volume = 0.25;
        this.currentSong.play();
        this.isPlaying = true;
    }
};
