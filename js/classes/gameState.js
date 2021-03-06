import { Subject } from 'rxjs';

export const State={
    Init:-1,
    Title:0,
    Pause:1,
    Playing:2,
    End:3,
    Complete:4,
}

export class GameState {

    constructor() {        
        this.isInVRSubject = new Subject();        
        this.isSprayingSubject = new Subject();        
        this.stateSubject = new Subject();
        this.scoreSubject = new Subject(); 
        this.junkThrownSubject = new Subject(); 

        this.interval = 3000;
    }

    _state = State.Init;    
    set state(value) {
        this._state = value;
        this.stateSubject.next(value);
    }
    get state() {
        return this._state;
    }

    _isInVR = false;
    set isInVR(value) {
        this._isInVR = value;
        this.isInVRSubject.next(value);
    }
    get isInVR() {
        return this._isInVR;
    }

    _isSpraying = false;
    set isSpraying(value) {
        this._isSpraying = value;
        this.isSprayingSubject.next(value);
    }
    get isSpraying() {
        return this._isSpraying;
    }

    _score = 0;
    set score(value) {
        this._score = value;        
        this.scoreSubject.next(value);
    }
    get score() {
        return this._score;
    }    

    _junkThrown = 0;
    set junkThrown(value) {
        this._junkThrown = value;        
        this.junkThrownSubject.next(value);
    }
    get junkThrown() {
        return this._junkThrown;
    }

    
}