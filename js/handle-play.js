WL.registerComponent('handle-play', {
    gameObject: {type: WL.Type.Object}
}, {    
    start: function() {
        this.game = this.gameObject.getComponent('game');
        this.target = this.object.getComponent('cursor-target');
        
        this.target.addUpFunction(()=>{
            this.game.play();
        });
    },
    
});
