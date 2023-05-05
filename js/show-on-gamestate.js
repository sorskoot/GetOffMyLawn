import { Component, Type } from "@wonderlandengine/api";
import GameGlobals from "./global";

import { filter } from "rxjs";

export class ShowOnGamestate extends Component {
  static TypeName = "show-on-gamestate";
  static Properties = {
    visibleState: {
      type: Type.Enum,
      values: ["Title", "Pause", "Playing", "End"],
      default: "Title",
    },
  };

  init() {
    this.object.setTranslationLocal([0, 500, 0]);

    GameGlobals.gameState.isInVRSubject.subscribe(
      this.handleSwitchToVR.bind(this)
    );

    let statePipe = GameGlobals.gameState.stateSubject;
    statePipe
      .pipe(filter((state) => state === this.visibleState))
      .subscribe(() => {
        if (GameGlobals.gameState.isInVR) {
          this.moveIntoView();
        }
      });

    statePipe
      .pipe(filter((state) => state !== this.visibleState))
      .subscribe(() => {
        this.moveOutOfView();
      });
  }

  moveIntoView() {
    this.object.setTranslationLocal([0, 0, 0]);
  }

  moveOutOfView() {
    this.object.setTranslationLocal([0, 500, 0]);
  }

  handleSwitchToVR(isInVR) {
    {
      if (isInVR === true) {
        if (GameGlobals.gameState.state == this.visibleState) {
          this.moveIntoView();
        }
      } else {
        this.moveOutOfView();
      }
    }
  }
}
