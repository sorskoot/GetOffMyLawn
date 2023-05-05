import { Component } from "@wonderlandengine/api";
import GameGlobals from "./global";

export class TrashOnLawnUpdater extends Component {
  static TypeName = "trash-on-lawn-updater";
  static Properties = {};

  init() {
    this.text = this.object.getComponent("text");
    GameGlobals.gameState.junkThrownSubject.subscribe((s) => {
      this.text.text = `${s}`;
    });
  }

  start() {}

  update(dt) {}
}
