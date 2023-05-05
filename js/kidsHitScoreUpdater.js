import { Component } from "@wonderlandengine/api";
import GameGlobals from "./global";

export class KidsHitScoreUpdater extends Component {
  static TypeName = "kidsHitScoreUpdater";
  static Properties = {};

  init() {
    this.text = this.object.getComponent("text");
    GameGlobals.gameState.scoreSubject.subscribe((s) => {
      this.text.text = `${s}`;
    });
  }

  start() {}
}
