const Client = require("../src/Client");
const BaseTextChannel = require("./BaseTextChannel");
const Channel = require("./Channel");
const Member = require("./Member");
const TextChannel = require("./channels/TextChannel");
const User = require("./User");
/**
 * @typedef {Object} ApiMessage
 * @property
 * @property {Object} message_reference
 * @property {Number} flags
 * @property {String} application_id
 * @property {?Object} interaction
 * @property {?Object} thread
 * @property {?Array<Object>} sticker_items
 * @property {?Array<Object>} stickers
 * @property {String} channel_id
 * @property {?String} guild_id
 * @property {Boolean} tts
 * @property {Boolean} mention_everyone
 */
module.exports = class Message {
    /**
     * 
     * @param {Client} client 
     * @param {ApiMessage} data 
     */
    constructor(client, data){
        this.client = client
        /**
         * @type {(String|null)} Message content
         */
        this.content = data.content ?? null
        /**
         * @type {(Array<Object>|null)} Message attachments
        */
        this.attachments = data.attachments ?? null
        /**
         * @type {(Array<Object>|null)} Message embeds
        */
        this.embeds = data.embeds ?? null
        /**
         * @type {User} Message author
        */
        this.author = new User(client, data.author)

        /**
         * @type {(Number|null)} Message type
         */
        this.type = data.type ?? null
        /**
         * @type {String} Message ID
         */
        this.id = data.id
        /**
         * @type {Map<String, Reaction>} Message reavctions
         */
        this.reactions = new Map(data.reactions?.map(r => [r.emoji.id ?? r.emoji.name, new Reaction(client, r)]))
        /**
         * @type {Array<Object>} Message components
        */
        this.components = data.components ?? null //[]
        /**
         * @type {Boolean} If message is pinned 
        */
        this.pinned = data.pinned ?? false
        /**
         * @type  {?(Number|String)} Message nonce
         */
        this.nonce = data.nonce ?? null
        this.channelId = data.channel_id
        this.guildId = data.guild_id


        /**
         * @deprecated
         */
        this.stickets = data.stickets
    }
    /**
     * @type { Guild }
     */
    get guild() {
        return this.client.guilds.get(this.guildId) ?? this.channel?.guild ?? null;
    }
    /** 
     *  @type { TextChannel } Message's channel
     * */
    get channel(){
        return this.client.channels.get(this.channelId)
    }
    /**
    * @property {(Member|null)} Message member 
    */
    get member(){
            return this.guild?.members.get(this.author.id) ?? null
    }
    async reply(options) {
        if (!this.channel) return Promise.reject(new Error('CHANNEL_NOT_CACHED'));
        if(typeof options === "string") options = { content: options}
        let data = {
            ...options,
            message_reference: {
                message_id: this.id,
                channel_id: this.channel_id,
                guild_id: this.guild_id
            }
        }

        return this.channel.send(data);
      }
      get createdTimestamp() {
        return Number(BigInt(this.id) >> 22n) + 1420070400000;
      }
}