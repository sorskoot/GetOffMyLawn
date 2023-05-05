import { Component } from "@wonderlandengine/api";
import GameGlobals from "./global";

export class HideOnVrstate extends Component {
  static TypeName = "hide-on-vrstate";
  static Properties = {};

  init() {
    this.object.setTranslationLocal([0, 0, 0]);

    GameGlobals.gameState.isInVRSubject.subscribe(
      this.handleSwitchToVR.bind(this)
    );
  }

  moveIntoView() {
    this.object.setTranslationLocal([0, 0, 0]);
  }

  moveOutOfView() {
    this.object.setTranslationLocal([0, 500, 0]);
  }

  handleSwitchToVR(isInVR) {
    {
      if (!isInVR) {
        this.moveIntoView();
      } else {
        this.moveOutOfView();
      }
    }
  }
}
