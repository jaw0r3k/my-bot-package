const { ButtonStyle } = require("../../src/enums")

module.exports = class Button {
    constructor(data={}){
        this.type = 2
        this.cutomId = data.cutom_id
        this.label = data.label
        this.style = data.style
        this.disabled = data.disabled ?? false
        this.url = data.url
        this.emoji = data.emoji
    }
    setStyle(style){
        this.style = typeof style === 'number' ? style : ButtonStyle[style];
        return this
    }
    setLabel(label){
        if(typeof label !== "string") return 
        
    }
}