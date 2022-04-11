import { State } from './classes/gameState';
WL.registerComponent('game', {
    playerObject: { type: WL.Type.Object },
    maxJunk: { type: WL.Type.Int, default: 10 }
}, {
    init: function () {
        document.getElementById('afterLoading').style.display = 'block';
        WL.onXRSessionStart.push(() => GetOffMyLawn.gameState.isInVR = true);
        WL.onXRSessionEnd.push(() => GetOffMyLawn.gameState.isInVR = false);
        WL.onXRSessionStart.push(() => {
            GetOffMyLawn.soundFxPlayer.initAudio();
            GetOffMyLawn.musicPlayer.initAudio();
        });
        window.GetOffMyLawn.gameState.stateSubject.subscribe(s => console.log(s));
        window.GetOffMyLawn.gameState.state = State.Init;

        window.GetOffMyLawn.gameState.junkThrownSubject.subscribe(j => {
            if (j == this.maxJunk) {
                window.GetOffMyLawn.gameState.state = State.End;
            }
        });
    },
    start: function () {
        GetOffMyLawn.gameState.state = State.Title;
    },
    play: function () {
        GetOffMyLawn.gameState.state = State.Playing;
        GetOffMyLawn.gameState.score = 0;
        GetOffMyLawn.gameState.junkThrown = 0;
    },
    update: function (dt) {

    },
});
