import { Component, Type } from "@wonderlandengine/api";

export class ButtonController extends Component {
  static TypeName = "button-controller";
  static Properties = {
    cursorTarget: { type: Type.Object },
    hoverMaterial: { type: Type.Material },
  };

  start() {
    this.mesh = this.object.getComponent("mesh");
    this.defaultMaterial = this.mesh.material;

    this.target = this.cursorTarget.getComponent("cursor-target");
    this.target.addHoverFunction(this.onHover.bind(this));
    this.target.addUnHoverFunction(this.onUnHover.bind(this));
    this.target.addDownFunction(this.onDown.bind(this));
    this.target.addUpFunction(this.onUp.bind(this));
  }

  onHover(_, cursor) {
    this.mesh.material = this.hoverMaterial;
    this.hapticFeedback(cursor.object, 0.5, 50);
  }

  onDown(_, cursor) {
    this.hapticFeedback(cursor.object, 1.0, 20);
  }

  onUp(_, cursor) {
    this.hapticFeedback(cursor.object, 0.7, 20);
  }

  onUnHover(_, cursor) {
    this.mesh.material = this.defaultMaterial;
    this.hapticFeedback(cursor.object, 0.3, 50);
  }

  hapticFeedback(object, strenght, duration) {
    const input = object.getComponent("input");
    if (input && input.xrInputSource) {
      const gamepad = input.xrInputSource.gamepad;
      if (gamepad && gamepad.hapticActuators) {
        gamepad.hapticActuators[0].pulse(strenght, duration);
      }
    }
  }
}
