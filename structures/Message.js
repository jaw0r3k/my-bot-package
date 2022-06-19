const Client = require("../src/Client");
const BaseTextChannel = require("./BaseTextChannel");
const Channel = require("./Channel");
const Member = require("./Member");
const TextChannel = require("./channels/TextChannel");
const User = require("./User");
const Base = require("./Base");
/**
 * @typedef {Object} ApiMessage
 * @property {?Object} thread
 * @property 
 * @property {?Array<Object>} stickers
 * @property {String} channel_id
 * @property {?String} guild_id
 * @property {Boolean} tts
 * @property {Boolean} mention_everyone
 */
module.exports = class Message extends Base {
    /**
     * 
     * @param {Client} client 
     * @param {ApiMessage} data 
     */
    constructor(client, data){
        super(client)
        /**
         * @type {String} Message ID
         */
        this.id = data.id
        this.channelId = data.channel_id
        this.guildId = data.guild_id


        /**
         * @deprecated
         */
        this.stickets = data.stickets
        this._patch(data)
    }
    _patch(data){
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
              this.author = new User(this.client, data.author)
      
              /**
               * @type {(Number|null)} Message type
               */
              this.type = data.type ?? null
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
                /**
                 * Message reference (**Reply of message**)
               * @type {?(Number|String)} 
               */
              this.messageReference = data.message_reference ?? null
              /**
                * @type {Number} Message flags
              */
              this.flags = data.flags ?? 0
              /**
                * @type {(Object|null)} Message interaction
              */
              this.interaction = data.interaction ?? null
                /**
                *  @type {(String|null)} Message webhook ID
              */
              this.webhookId = data.webhook_id ?? null
              /**
                *  @type {(String|null)} ID of owner of message webhook
              */
             this.applicationId = data.application_id ?? null
              /**
               * @type{?Array<Object>} sticker_items
             */
              this.stickerItems = data.sticker_items ?? []
    }
    /**
     * @type { Guild }
     */
    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? this.channel?.guild ?? null;
    }
    /** 
     *  @type { TextChannel } Message's channel
     * */
    get channel(){
        return this.client.channels.cache.get(this.channelId)
    }
    /**
    * @property {(Member|null)} Message member 
    */
    get member(){
            return this.guild?.members.cache.get(this.author.id) ?? null
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