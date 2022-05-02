import { State } from './classes/gameState';
WL.registerComponent('game', {
    playerObject: { type: WL.Type.Object },
    maxJunk: { type: WL.Type.Int, default: 10 },
    startInterval: { type: WL.Type.Int, default: 5000 },
    thrownParent: { type: WL.Type.Object },
    throwableParent: { type: WL.Type.Object },
}, {
    init: function () {
        document.getElementById('afterLoading').style.display = 'block';
        WL.onXRSessionStart.push(() => GetOffMyLawn.gameState.isInVR = true);
        WL.onXRSessionEnd.push(() => GetOffMyLawn.gameState.isInVR = false);
        WL.onXRSessionStart.push(() => {
            GetOffMyLawn.soundFxPlayer.initAudio();
            GetOffMyLawn.musicPlayer.initAudio();
        });

        window.GetOffMyLawn.gameState.state = State.Init;

        window.GetOffMyLawn.gameState.junkThrownSubject.subscribe(j => {
            if (j == this.maxJunk) {
                window.GetOffMyLawn.gameState.state = State.End;                
            }
        });

        window.GetOffMyLawn.gameState.isInVRSubject.subscribe(isInVR=>{
            if(isInVR && window.GetOffMyLawn.gameState.state==State.Pause){
                window.GetOffMyLawn.gameState.state = State.Playing;   
            }else if(!isInVR 
                && window.GetOffMyLawn.gameState.state == State.Playing){
                window.GetOffMyLawn.gameState.state = State.Pause;   
            }
            
        })
        
    },
    start: function () {
        GetOffMyLawn.gameState.state = State.Title;
    },
    play: function () {
        GetOffMyLawn.gameState.state = State.Playing;
        GetOffMyLawn.gameState.score = 0;
        GetOffMyLawn.gameState.interval = this.startInterval;
        GetOffMyLawn.gameState.junkThrown = 0;
        for (let i = 0; i < this.thrownParent.children.length; i++) {
            const thrown = this.thrownParent.children[i];
            thrown.resetTransform();
            thrown.parent = this.throwableParent;            
        }
    },
    update: function (dt) {

    },
});
