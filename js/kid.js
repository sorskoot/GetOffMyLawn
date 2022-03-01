WL.registerComponent('kid', {
    animatedObject: { type: WL.Type.Object },
    throwablesParent: { type: WL.Type.Object },
}, {

    init: function () {
        this.isSpawned = false;
        this.animation = this.animatedObject.getComponent('animation');
    },

    spawn: function () {
        this.isSpawned = true;
        this.t = 0;
        this.animation.play();
        this.thrown = false;        
        let num = this.throwablesParent.children.length;

        this.throwing = this.throwablesParent.children[~~(Math.random()*num)];                
        if (!this.throwing) return;
        this.throwing.getComponent('mesh').active = false;
        let pos = this.object.getTranslationWorld([]);
        pos[1] = 3;
       // pos[0] = 5.5;
       // pos[2] = -6.5;
        this.throwing.setTranslationWorld(pos);
    },

    update: function (dt) {
        if (this.isSpawned) {
            this.t += dt;
            let pos = this.object.getTranslationWorld([]);
            pos[1] = Math.sin(this.t / 2.0 * Math.PI) * 1.5;
            this.object.setTranslationWorld(pos);
        }       
        if (this.t > 1.2 && !this.thrown) {
            let physx = this.throwing.getComponent('physx');
            this.throwing.getComponent('mesh').active = true;
            physx.kinematic = false;
            setTimeout(()=>{
                physx.kinematic = true;
            }, 2500);
            physx.addForce([0, 0, (400 +(Math.random()*400))*2 ] );
            physx.addTorque([0,0, 500 * 2]);
            this.throwing.parent = null;
            this.thrown = true;
        }

        if (this.t > 2.0) {
            this.t = 0;
            this.isSpawned = false;
            this.animation.stop();
        }
    }

});
