import { Sounds } from "./utils/soundfx-player";

WL.registerComponent('spray', {
    water: {type: WL.Type.Object}
}, {
    start: function() {
        this.waterMesh = this.water.getComponent('mesh');
        this.waterMesh.active = false;
        this.input = this.object.getComponent('input');
        this.initialized = false;
        WL.onXRSessionStart.push((session) => {
            if (this.initialized) return;
            session.addEventListener('selectstart', (e) => {
                if(!this.active) return;
                if (e.inputSource.handedness === this.input.handedness) {                    
                    this.waterMesh.active = true;
                    window.GetOffMyLawn.gameState.isSpraying = true;
                    GetOffMyLawn.soundFxPlayer.playSoundLoopStart(Sounds.spray);                    
                }
            });
            session.addEventListener('selectend', (e) => {
                if(!this.active) return;
                if (e.inputSource.handedness === this.input.handedness) {                    
                    this.waterMesh.active = false;
                    window.GetOffMyLawn.gameState.isSpraying = false;
                    GetOffMyLawn.soundFxPlayer.playSoundLoopEnd();
                }
            });
            this.initialized = true;
        })
    },
    
});
