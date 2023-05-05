import { GameState } from "./classes/gameState";
import { MusicPlayer } from "./utils/music-player";
import { SoundfxPlayer } from "./utils/soundfx-player";

const GameGlobals = {
  gameState: new GameState(),
  soundFxPlayer: new SoundfxPlayer(),
  musicPlayer: new MusicPlayer(),
};

export default GameGlobals;
