import { Component, Type } from "@wonderlandengine/api";
import { State } from "./classes/gameState";
import GameGlobals from "./global";

export class Game extends Component {
  static TypeName = "game";
  static Properties = {
    playerObject: { type: Type.Object },
    maxJunk: { type: Type.Int, default: 10 },
    startInterval: { type: Type.Int, default: 5000 },
    thrownParent: { type: Type.Object },
    throwableParent: { type: Type.Object },
  };

  init() {
    console.log("Game init");
    const afterLoadingEl = document.getElementById("afterLoading");
    if (afterLoadingEl) afterLoadingEl.style.display = "block";

    this.engine.onXRSessionStart.push(
      () => (GameGlobals.gameState.isInVR = true)
    );
    this.engine.onXRSessionEnd.push(
      () => (GameGlobals.gameState.isInVR = false)
    );
    this.engine.onXRSessionStart.push(() => {
        GameGlobals.soundFxPlayer.initAudio();
        GameGlobals.musicPlayer.initAudio();
    });

    GameGlobals.gameState.state = State.Init;

    GameGlobals.gameState.junkThrownSubject.subscribe((j) => {
      if (j == this.maxJunk) {
        GameGlobals.gameState.state = State.End;
      }
    });

    GameGlobals.gameState.isInVRSubject.subscribe((isInVR) => {
      if (isInVR && GameGlobals.gameState.state == State.Pause) {
        GameGlobals.gameState.state = State.Playing;
      } else if (
        !isInVR &&
        GameGlobals.gameState.state == State.Playing
      ) {
        GameGlobals.gameState.state = State.Pause;
      }
    });
  }

  start() {
    GameGlobals.gameState.state = State.Title;
  }

  play() {
    GameGlobals.gameState.state = State.Playing;
    GameGlobals.gameState.score = 0;
    GameGlobals.gameState.interval = this.startInterval;
    GameGlobals.gameState.junkThrown = 0;
    for (let i = 0; i < this.thrownParent.children.length; i++) {
      const thrown = this.thrownParent.children[i];
      thrown.resetTransform();
      thrown.parent = this.throwableParent;
    }
  }

  update(dt) {}
}
