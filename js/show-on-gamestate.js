import { filter } from "rxjs";

WL.registerComponent('show-on-gamestate', {
    visibleState: {
        type: WL.Type.Enum, values: [
            'Title',
            'Pause',
            'Playing',
            'End'], default: '-1'
    },
}, {
    init() {
        
        this.object.setTranslationLocal([0, 500, 0]);
        
        GetOffMyLawn.gameState.isInVRSubject.subscribe(
            this.handleSwitchToVR.bind(this));

        let statePipe = GetOffMyLawn.gameState.stateSubject;
        statePipe.pipe(filter(state => state === this.visibleState))
            .subscribe(() => {
                if (GetOffMyLawn.gameState.isInVR) {
                    this.moveIntoView();
                }
            });

        statePipe.pipe(filter(state => state !== this.visibleState))
            .subscribe(() => {
                this.moveOutOfView();
            });
    },
    moveIntoView() {
        this.object.setTranslationLocal([0, 0, 0]);
    },
    moveOutOfView() {
        this.object.setTranslationLocal([0, 500, 0]);
    },
    handleSwitchToVR(isInVR) {
        {            
            if (isInVR === true) {
                if (GetOffMyLawn.gameState.state == this.visibleState) {
                    this.moveIntoView();
                }
            } else {
                this.moveOutOfView();
            }
        }
    }
});
