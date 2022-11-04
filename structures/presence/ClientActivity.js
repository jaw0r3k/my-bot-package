const { ActivityType } = require("../../src/enums")
/**
 * @typedef {ClientActivtyData}
 * @property {string} name
 * @property {string|number} type
 * @property {?string} url
 */
module.exports = class ClientActivity {
    /**
     * @param {ClientActivtyData} data 
     */
    constructor(data={}) {
        this.name = data.name
        this.type = data.type ? ( typeof data.type === "number" ? data.type : ActivityType[data.type] ) : ActivityType.Playing 
        this.url = data.url
    }
    /**
     * 
     * @param {ActivityType} type 
     * @returns {ClientActivity}
     */
    setType(type){
        this.type = typeof type === "number" ? type : ActivityType[type]
        return this
    }
    /**
     * 
     * @param {string} name 
     * @returns {ClientActivity}
    */
    setName(name){
        this.name = name
        return this
    }
        /**
     * 
     * @param {string} url 
     * @returns {ClientActivity}
     */
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