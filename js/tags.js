WL.registerComponent('tags', {
    tags: {type: WL.Type.String},
}, {      
    /**
     * 
     * @param {string} tag the tag to test
     */
    hasTag:function(tag){
        const tags = this.tags.split(/\W+/g);   
        return !!~tags.indexOf(tag);
    }
});