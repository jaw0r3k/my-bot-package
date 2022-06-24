const Channel = require("./Channel");
const Guild = require("./Guild")
module.exports = class GuildChannel extends Channel {
    constructor(client, data){
        super(client, data)
        /**
         * @type {String}
         */
        this.guildId = data.guild_id;
        /**
         * @type {Number}
         */
        this._patch(data)
    }
        _patch(data){
        this.position = data.position
        /**
         * @type {String}
         */
        this.parentId = this.parent_id ?? null;
    }
    /**
     * @type {Guild}
     */
    get guild(){
        return client.guilds.get(data.guild_id)
    }
}