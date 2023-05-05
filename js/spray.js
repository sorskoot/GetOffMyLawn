import { Component, Type } from "@wonderlandengine/api";

import { Sounds } from "./utils/soundfx-player";

export class Spray extends Component {
  static TypeName = "spray";
  static Properties = {
    water: { type: Type.Object },
  };

  start() {
    this.waterMesh = this.water.getComponent("mesh");
    this.waterMesh.active = false;
    this.input = this.object.getComponent("input");
    this.initialized = false;
    this.engine.onXRSessionEnd.push(() => {
      this.initialized = false;
    });
    this.engine.onXRSessionStart.push((session) => {
      if (this.initialized) return;
      session.addEventListener("selectstart", (e) => {
        if (!this.active) return;
        if (e.inputSource.handedness === this.input.handedness) {
          console.log("selectstart");
          this.waterMesh.active = true;
          GameGlobals.gameState.isSpraying = true;
          GameGlobals.soundFxPlayer.playSoundLoopStart(Sounds.spray);
        }
      });
      session.addEventListener("selectend", (e) => {
        if (!this.active) return;

        if (e.inputSource.handedness === this.input.handedness) {
          console.log("selectend");
          this.waterMesh.active = false;
          GameGlobals.gameState.isSpraying = false;
          GameGlobals.soundFxPlayer.playSoundLoopEnd();
        }
      });
      this.initialized = true;
    });
  }
}
