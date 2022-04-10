import { State } from "./classes/gameState";

WL.registerComponent('spawner', {
}, {
    start: function () {
        this.kids = this.object.children;
        GetOffMyLawn.gameState.stateSubject
                    .subscribe(this.onStateChanged.bind(this));
    },
    onStateChanged(state) {
        if (state === State.Playing) {
            this.timer = setInterval(() => {
                let pos = this.kids[0].getTranslationWorld([]);
                pos[0] = (Math.random() * 10) - 3.5;
                this.kids[0].setTranslationWorld(pos);
                this.kids[0].getComponent('kid').spawn();
            }, 3000);
        } else {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    }
});
