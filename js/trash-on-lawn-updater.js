WL.registerComponent('trash-on-lawn-updater', {
}, {
    init: function() {
        this.text = this.object.getComponent('text');
        GetOffMyLawn.gameState.junkThrownSubject.subscribe(s=>{
            this.text.text = `${s}`;
        });
    },
    start: function() {
        
    },
    update: function(dt) {
        
    },
});
