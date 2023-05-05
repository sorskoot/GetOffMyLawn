import { Component } from "@wonderlandengine/api";
import GameGlobals from "./global";
import { State } from "./classes/gameState";

export class Spawner extends Component {
  static TypeName = "spawner";
  static Properties = {};

  start() {
    this.kids = this.object.children;

    this.max = this.kids.length;
    this.current = 0;
    GameGlobals.gameState.stateSubject.subscribe(
      this.onStateChanged.bind(this)
    );
  }

  onStateChanged(state) {
    if (state === State.Playing) {
      this.timer = setTimeout(
        this.spawn.bind(this),
        GameGlobals.gameState.interval
      );
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }

  spawn() {
    let pos = this.kids[this.current].getTranslationWorld([]);
    pos[0] = Math.random() * 10 - 3.5;
    this.kids[this.current].setTranslationWorld(pos);
    this.kids[this.current].getComponent("kid").spawn();
    this.current = (this.current + 1) % this.max;
    GameGlobals.gameState.interval -= 250;
    if (GameGlobals.gameState.interval < 500) {
      GameGlobals.gameState.interval = 500;
    }
    // Schedule next
    this.timer = setTimeout(
      this.spawn.bind(this),
      GameGlobals.gameState.interval
    );
  }
}
