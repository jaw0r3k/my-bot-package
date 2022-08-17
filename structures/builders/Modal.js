module.exports = class ModalBuilder {
    constructor(data={}){
        this.customId = data.custom_id
        this.title = data.title
        this.components = data.components ?? []
    }
    setCustomId(id){
        this.customId = id
        return this
    }
    setTitle(title){
        this.title = title
        return this
    }
    addComponent(component){
        this.components.push(component)
        return this
    }
    setComponents(components){
        this.components = components
        return this
    
    }
    toJSON(){
        return {
            title: this.title,
            custom_id: this.customId,
            components: this.components
        }
    }
}