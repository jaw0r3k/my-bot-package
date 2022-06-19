const GuildChannel = require("./GuildChannel");

module.exports = class BaseTextChannel extends GuildChannel {
    constructor(client, data){
        super(client, data);
        /**
         * @type {?Map}
         */
        const MessagesManager = require("../managers/MessagesManager");
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
    async send(data){
        await this.client.api.endpoint(`channels/${this.id}/messages`, "POST", data)
    }
}