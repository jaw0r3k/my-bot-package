const Guild = require("./Guild")
module.exports = class GuildChannel extends Channel {
    constructor(client, data){
        /**
         * @type {String}
         */
        this.guildId = data.guild_id;
        /**
         * @type {Number}
         */
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