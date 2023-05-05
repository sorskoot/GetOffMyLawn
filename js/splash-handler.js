import { Component, Type } from "@wonderlandengine/api";
import GameGlobals from "./global";

export class SplashHandler extends Component {
  static TypeName = "splash-handler";
  static Properties = {
    cursorObject: { type: Type.Object },
  };

  start() {
    this.mesh = this.cursorObject.getComponent("mesh");
    this.mesh.active = false;
    this.target = this.object.getComponent("cursor-target");

    this.target.addHoverFunction(this.onHover.bind(this));
    this.target.addUnHoverFunction(this.onUnHover.bind(this));

    this.target.addDownFunction(this.onDown.bind(this));
    this.target.addUpFunction(this.onUp.bind(this));
  }

  onHover(_, cursor) {
    this.mesh.active = GameGlobals.gameState.isSpraying;

    const kid = this.object.parent.getComponent("kid");
    if (kid) {
      kid.hit();
    }
  }

  onUnHover(_, cursor) {
    this.mesh.active = false;
  }

  onDown(_, cursor) {
    this.mesh.active = true;
  }

  onUp(_, cursor) {
    this.mesh.active = false;
  }
}
