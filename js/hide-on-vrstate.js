import { filter } from "rxjs";

WL.registerComponent('hide-on-vrstate', {
}, {
    init() {

        this.object.setTranslationLocal([0, 0, 0]);

        GetOffMyLawn.gameState.isInVRSubject.subscribe(
            this.handleSwitchToVR.bind(this));

    },
    moveIntoView() {
        this.object.setTranslationLocal([0, 0, 0]);
    },
    moveOutOfView() {
        this.object.setTranslationLocal([0, 500, 0]);
    },
    handleSwitchToVR(isInVR) {
        {
            if (!isInVR) {
                this.moveIntoView();
            } else {
                this.moveOutOfView();
            }
        }
    }
});
