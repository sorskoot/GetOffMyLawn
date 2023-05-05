import { Component, Type } from "@wonderlandengine/api";
import GameGlobals from "./global";
const { Sounds } = require("./utils/soundfx-player");

export class Kid extends Component {
  static TypeName = "kid";
  static Properties = {
    animatedObject: { type: Type.Object },
    throwablesParent: { type: Type.Object },
    thrownParent: { type: Type.Object },
  };

  init() {
    this.isSpawned = false;
    this.animation = this.animatedObject.getComponent("animation");
  }

  spawn() {
    this.isSpawned = true;
    this.t = 0;
    this.animation.play();
    this.thrown = false;
    let num = this.throwablesParent.children.length;

    this.throwing = this.throwablesParent.children[~~(Math.random() * num)];
    if (!this.throwing) return;
    this.throwingThud = 0;

    this.throwing.getComponent("mesh").active = false;
    let pos = this.object.getTranslationWorld([]);
    pos[1] = 3;
    this.throwing.setTranslationWorld(pos);
    this.isHit = false;
  }

  update(dt) {
    if (this.isSpawned) {
      this.t += dt;
      let pos = this.object.getTranslationWorld([]);
      pos[1] = Math.sin((this.t / 2.0) * Math.PI) * 1.5;
      this.object.setTranslationWorld(pos);
    }
    if (this.t > 1.2 && !this.thrown && !this.isHit) {
      GameGlobals.soundFxPlayer.playSound(Sounds.throw);
      GameGlobals.gameState.junkThrown++;
      let physx = this.throwing.getComponent("physx");
      this.throwing.getComponent("mesh").active = true;
      physx.kinematic = false;
      let physxSound = 0;
      physx.onCollision(() => {
        if (physxSound > 2) return;
        physxSound++;
        GameGlobals.soundFxPlayer.playSound(Sounds.thud);
      });
      setTimeout(() => {
        physx.kinematic = true;
      }, 2500);
      physx.addForce([0, 0, (400 + Math.random() * 400) * 2]);
      physx.addTorque([0, 0, 500 * 2]);
      this.throwing.parent = this.thrownParent;
      this.thrown = true;
    }

    if (this.t > 2.0) {
      this.t = 0;
      this.isSpawned = false;
      this.animation.stop();
    }
  }

  hit() {
    if (this.isHit) {
      return;
    }
    GameGlobals.soundFxPlayer.playSound(Sounds.hit);
    GameGlobals.gameState.score++;
    this.isHit = true;
    this.t = 2;
  }
}
