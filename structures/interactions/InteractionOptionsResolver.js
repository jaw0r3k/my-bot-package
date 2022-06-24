module.exports = class InteractionOptionsResolver {
    constructor(client, options, resolvedOptions){
        this.client = client
        this.data = options
        this.resolved = resolvedOptions ?? {}
    }
    getString(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 3) return null
        return option.value
    }
    getInteger(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 4) return null
        return option.value
    }
    getUser(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 6)  return null
        return this.client.users._add(this.resolved.users[option.value])
    }
    getChannel(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 7) return null
        return this.client.channels._add(this.resolved.users[option.value], { cache: false })
    }
    getRole(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 8) throw new Error("INVALID_TYPE", "option")
        return this.client.users._add(this.resolved.users[option.value])
    }
    getMember(name){
        const option = this.data.find(option => option.name === name)
        if(option.type !== 6) return null
        return this.client.users._add(this.resolved.users[option.value])
    }
}