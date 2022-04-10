import {State} from './classes/gameState';

WL.registerComponent('game', {
    playerObject: { type: WL.Type.Object }
}, {
    init: function() {   
        document.getElementById('afterLoading').style.display = 'block';     
        WL.onXRSessionStart.push(() => GetOffMyLawn.gameState.isInVR = true);
        WL.onXRSessionEnd.push(() => GetOffMyLawn.gameState.isInVR = false);
        WL.onXRSessionStart.push(() => {
            GetOffMyLawn.soundFxPlayer.initAudio();
            GetOffMyLawn.musicPlayer.initAudio();
        });        
        GetOffMyLawn.gameState.stateSubject.subscribe(s=>console.log(s));
        GetOffMyLawn.gameState.state = State.Init;
    },
    start: function() {
        GetOffMyLawn.gameState.state = State.Title;
    },
    play: function(){
        GetOffMyLawn.gameState.state = State.Playing;
        GetOffMyLawn.gameState.score = 0;
    },
    update: function(dt) {
  
    },
});
