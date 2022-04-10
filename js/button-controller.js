WL.registerComponent('button-controller', {
    cursorTarget: {type: WL.Type.Object},
    hoverMaterial: {type: WL.Type.Material},
}, {
    start: function() {
        this.mesh = this.object.getComponent('mesh');        
        this.defaultMaterial = this.mesh.material;

        this.target = this.cursorTarget.getComponent('cursor-target');
        this.target.addHoverFunction(this.onHover.bind(this));
        this.target.addUnHoverFunction(this.onUnHover.bind(this));
        this.target.addDownFunction(this.onDown.bind(this));
        this.target.addUpFunction(this.onUp.bind(this));
    },

    onHover: function(_, cursor) {
        this.mesh.material = this.hoverMaterial;
        this.hapticFeedback(cursor.object, 0.5, 50);
    },

    onDown: function(_, cursor) {        
        this.hapticFeedback(cursor.object, 1.0, 20);
    },

    onUp: function(_, cursor) {        
        this.hapticFeedback(cursor.object, 0.7, 20);
    },

    onUnHover: function(_, cursor) {
        this.mesh.material = this.defaultMaterial;        
        this.hapticFeedback(cursor.object, 0.3, 50);
    },

    hapticFeedback: function(object, strenght, duration) {
        const input = object.getComponent('input');
        if(input && input.xrInputSource) {
            const gamepad = input.xrInputSource.gamepad;
            if(gamepad && gamepad.hapticActuators){
                gamepad.hapticActuators[0].pulse(strenght, duration);
            }
        }
    },
});
