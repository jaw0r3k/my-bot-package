const MessagePayLoad = require("../utils/MessagePayLodad");
const GuildChannel = require("./GuildChannel");
 class BaseTextChannel extends GuildChannel {
    constructor(client, data){
        super(client, data);
        const MessagesManager = require("../managers/MessagesManager");
        /**
         * @type {?MessagesManager}
         */
        this.messages = new MessagesManager(client, this)
        /**
         * @type {?String}
         */
        this.lastMessageId = data.last_message_id ?? null;
        /**
         * @type {?number}
         */
        this.lastPinTimestamp = data.last_pin_timestamp ?? null;
        /**
         * @type {Boolean}
         */
        this.nsfw = data.nsfw
    }
    async send(options){
        const User = require('./User');
        const Member = require('./Member');
    
        if (this instanceof User || this instanceof Member) {
          const dm = await this.createDM();
          return dm.send(options);
        }
        let messagePayload;

        if (options instanceof MessagePayLoad) {
          messagePayload = options.resolveData();
        } else {
          messagePayload = MessagePayLoad.create(this, options).resolveData();
        }
        const { data, files } = await messagePayload.resolveFiles();
        await this.client.api.endpoint(`channels/${this.id}/messages`, "POST", { data, files })
    }
}
module.exports = BaseTextChannel