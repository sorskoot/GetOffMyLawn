WL.registerComponent(
    "retarget-animation",
    {
        jumpAnimation: { type: WL.Type.Animation },        
        bodyMeshObject: { type: WL.Type.Object },
    },
    {
        start: function () {
            this.animationComponents = {
                "jump": this.object.getComponent('animation', 0),                
            }

            if (this.jumpAnimation) {
                let mesh = this.bodyMeshObject.getComponent("mesh");

                this.jumpAnimation = this.jumpAnimation.retarget(mesh.skin);
                this.animationComponents["jump"].animation = this.jumpAnimation;
                this.animationComponents["jump"].play();

                // this.attackAnimation = this.attackAnimation.retarget(mesh.skin);
                // this.animationComponents["attack"].animation = this.attackAnimation;
                // this.animationComponents["attack"].animation.playCount = 1;

                // this.deathAnimation = this.deathAnimation.retarget(mesh.skin);
                // this.animationComponents["death"].animation = this.deathAnimation;
                // this.animationComponents["death"].animation.playCount = 1;
                this.lastPlayedAnimation = null;
            }
        },
        playAnimation: function (animationName) {
            if (this.lastPlayedAnimation == animationName) return;
            if (this.lastPlayedAnimation) {
                this.animationComponents[this.lastPlayedAnimation].stop();
            }
            this.lastPlayedAnimation = animationName;
            this.animationComponents[animationName].play();
        }
    }
);