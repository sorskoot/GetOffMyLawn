WL.registerComponent('splash-handler', {
    cursorObject: {type: WL.Type.Object},    
}, {
    start: function() {
        this.mesh = this.cursorObject.getComponent('mesh');
        this.mesh.active = false;
        this.target = this.object.getComponent('cursor-target');        
        
        this.target.addHoverFunction(this.onHover.bind(this));
        this.target.addUnHoverFunction(this.onUnHover.bind(this));
        
        this.target.addDownFunction(this.onDown.bind(this));
        this.target.addUpFunction(this.onUp.bind(this));
    },
    onHover: function(_, cursor) {
        this.mesh.active = window.GetOffMyLawn.gameState.isSpraying;   
    },
    onUnHover: function(_, cursor) {
        this.mesh.active = false;   
    },
    onDown: function(_, cursor) {     
        this.mesh.active = true;           
    },

    onUp: function(_, cursor) {        
        this.mesh.active = false;
    },
});
