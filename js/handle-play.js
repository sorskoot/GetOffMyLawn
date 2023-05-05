import { Component, Type } from "@wonderlandengine/api";

export class HandlePlay extends Component {
  static TypeName = "handle-play";
  static Properties = {
    gameObject: { type: Type.Object },
  };

  start() {
    this.game = this.gameObject.getComponent("game");
    this.target = this.object.getComponent("cursor-target");

    this.target.addUpFunction(() => {
      this.game.play();
    });
  }
}
