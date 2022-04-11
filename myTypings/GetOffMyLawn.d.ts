import { GameState } from "../js/classes/gameState"
import { MusicPlayer } from "../js/utils/music-player";
import { SoundfxPlayer } from "../js/utils/soundfx-player";


interface GetOffMyLawn 
{
        soundFxPlayer: SoundfxPlayer
        musicPlayer: MusicPlayer
        gameState: GameState
}

declare global {
    interface Window { GetOffMyLawn : GetOffMyLawn ; }
}



export {};