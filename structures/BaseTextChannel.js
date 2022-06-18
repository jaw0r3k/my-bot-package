const { default: fetch } = require("node-fetch");
const Channel = require("./Channel");
const Constants = require("../src/Constants");
const MessagesManager = require("../managers/MessagesManager");
module.exports = class BaseTextChannel extends GuildChannel {
    constructor(client, data){
        super(client, data);
         /**
         * @type {?Map}
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
    async send(data){
        const headers = { "Content-Type": "application/json", "Authorization": `Bot ${this.client.token}`}
        fetch(Constants.api + `channels/${this.id}/messages`, {
            method: "POST",
            body: JSON.stringify(data),
            headers
        })
    }
}