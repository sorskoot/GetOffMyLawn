WL.registerComponent('kidsHitScoreUpdater', {    
}, {
    init: function() {
        this.text = this.object.getComponent('text');
        GetOffMyLawn.gameState.scoreSubject.subscribe(s=>{
            this.text.text = `${s}`;
        });
    },
    start: function() {
       
    },
    
});
