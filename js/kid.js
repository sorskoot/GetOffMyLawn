WL.registerComponent('kid', {    
    animatedObject: {type: WL.Type.Object}
}, {
    
    init: function() {
        this.isSpawned = false;    
        this.animation = this.animatedObject.getComponent('animation');
    },
    
    spawn:function(){
        this.isSpawned = true;
        this.t = 0;
        this.animation.play();
    },

    update:function(dt){
        if(this.isSpawned){
            this.t+=dt;
            let pos = this.object.getTranslationWorld([]);
            pos[1] = Math.sin(this.t / 2.0 * Math.PI ) * 1.5;
            this.object.setTranslationWorld(pos);
        }

        if(this.t > 2.0){
            this.t = 0;
            this.isSpawned = false;
            this.animation.stop();
        }
    }

});
