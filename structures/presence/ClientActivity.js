const { ActivityType } = require("../../src/enums")

module.exports = class ClientActivity {
    constructor(data={}) {
        this.name = data.name
        this.type = typeof data.type === "number" ? data.type : ActivityType[data.type]
        this.url = data.url
    }
    setType(type){
        this.type = typeof type === "number" ? type : ActivityType[type]
        return this
    }
    setName(name){
        this.name = name
        return this
    }
    setURL(url){
        this.url = url
        return this
    }
    toJSON(){
        if(this.url && this.type !== ActivityType.Streaming) throw new Error("Url without Streaming type")
        return {
            name: this.name,
            type: this.type,
            url: this.url,
        }
    }
}