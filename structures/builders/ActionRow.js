module.exports = class ActionRow {
    constructor(data){
        this.type = 1
        this.components = data.components ?? []
    }
    addComponent(component){
        this.components.push(component)
        return this
    }
    setComponent(components){
        this.components = components
        return this
    }
    toJSON(){
        return {
            type: 1,
            components: this.components,
        }
    }
}