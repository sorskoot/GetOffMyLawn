import {State} from './classes/gameState';

WL.registerComponent('game', {
    playerObject: { type: WL.Type.Object }
}, {
    init: function() {        
        WL.onXRSessionStart.push(() => GetOffMyLawn.gameState.isInVR = true);
        WL.onXRSessionEnd.push(() => GetOffMyLawn.gameState.isInVR = false);
        WL.onXRSessionStart.push(() => {
            GetOffMyLawn.soundFxPlayer.initAudio();
            GetOffMyLawn.musicPlayer.initAudio();
        });
    },
    start: function() {
        GetOffMyLawn.gameState.state = State.Title;
        GetOffMyLawn.gameState.score = 0;
    },
    update: function(dt) {
  
    },
});
