const Role = require("../Role");

module.exports = class InteractionOptionsResolver {
    constructor(client, options, resolvedOptions){
        Object.defineProperty(this, 'client', { value: client });
        this.data = options
        if (this.data[0]?.type === 2) {
            this._group = this.data[0].name;
            this.data = this.data[0].options ?? [];
          }
        if (this.data[0]?.type === 1) {
            this._subcommand = this.data[0].name;
            this.data = this.data[0].options ?? [];
        }
        this.resolved = resolvedOptions ?? {}
    }
    get(name){
        const option = this.data.find(option => option.name === name)
        return option
    }
    getSubcommandGroup(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 2) return null
        return option.value
    }
    getSubcommand(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 1) return null
        return option.value
    }
    getString(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 3) return null
        return option.value
    }
    getNumber(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 10) return null
        return option.value
    }
    getInteger(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 4) return null
        return option.value
    }
    getBoolan(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 5) return null
        return option.value
    }
    getUser(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 6) return null
        return this.client.users._add(this.resolved.users[option.value] ?? null, false)
    }
    getRole(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 7) return null
        return new Role(client, this.resolved.roles[option.value] ?? null, )
    }
    getAttachment(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 7) return null
        return this.client.channels._add(this.resolved.channels[option.value] ?? null, null, false)
    }
    getFocused(){
        const option = this.data.find(option => option.focused)
        if(!option) return null
        return option.value
    }
}