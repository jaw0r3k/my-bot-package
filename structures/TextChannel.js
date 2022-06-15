const BaseTextChannel = require("./BaseTextChannel");
const Channel = require("./Channel");
const Guild = require("./Guild");

module.exports = class TextChannel extends BaseTextChannel{
    constructor(client, data){
        super(client, data)
        /**
         * @type {(String|null)} Topic of channel
        */
        this.topic = data.topic ?? null
         /**
         * @type {(String|null)} Channel parent channel id 
        */
        this.parentId = data.parent_id ?? null
        /**
         * @type {String} Channel guild id
        */
        this.guildId = data.guild_id   
        /**
         * @type {Number} Position of channel
         */
        this.position = data.position
    }
    /**
     * @type {Guild}
     */
    get guild(){
        return client.guilds.get(data.guild_id)
    }
        /**
     * @type {Channel}
     */
    get parent(){
        return client.channels.get(data.parent_id) ?? null
    }
}