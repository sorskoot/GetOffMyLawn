WL.registerComponent('spawner', {
}, {
    start: function () {
        this.kids = this.object.children;

        setInterval(() => {
            let pos = this.kids[0].getTranslationWorld([]);
            pos[0] = (Math.random() * 10) - 3.5;
            this.kids[0].setTranslationWorld(pos);
            this.kids[0].getComponent('kid').spawn();
        }, 3000);
    },

});
