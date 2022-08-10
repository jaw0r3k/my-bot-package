const Collection = require("../structures/Collection");
const Message = require("../structures/Message");
const CachedManager = require("./CachedManager");

module.exports = class MessagesManager extends CachedManager {
    constructor(client, channel){
       super(client, Message)
       this.channel = channel
    }
    _add(data, { cache = true } = {}) {
        const existing = this.cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          return existing;
        }
        
        const message = new Message(this.client, data)
    
        if (!message) {
          return null;
        }
    
        if (cache) this.cache.set(message.id, message);
    
        return message;
      }
      async fetchPinned(cache = true) {
        const data = await this.client.api.endpoint(`channels/${this.channel.id}/pins`)
        
        return new Map(data.map(m => [m.id, this._add(m, { cache })]));
      }
      async edit(message, options) {
        const messageId = this.resolveId(message);
        if (!messageId) throw new TypeError('INVALID_TYPE', 'message', 'MessageResolvable');
    
        const data = await this.client.api.endpoint(`/channels/${this.channel.id}/messages/${messageId}`, "PATCH", { data: options })
    
        const existing = this.cache.get(messageId);
        if (existing) {
          const clone = existing._clone();
          clone._patch(data); // TODO: do _patch in classes
          return clone;
        }
        return this._add(data);
      }

      async pin(message, reason){
        message = this.resolveId(message);
        if (!message) throw new TypeError('INVALID_TYPE', 'message', 'MessageResolvable');
    
        await this.client.api.endpoint(`/channels/${this.channel.id}/pins/${message}`, "PUT", { reason })
      }
      async unpin(message, reason) {
        message = this.resolveId(message);
        if (!message) throw new TypeError('INVALID_TYPE', 'message', 'MessageResolvable');
    
        await this.client.api.endpoint(`/channels/${this.channel.id}/pins/${message}`, "DELETE", { reason })
      }
      async react(message, emoji){
        console.log("not done") // TODO: make emoji resolver
      }
      async delete(message) {
        message = this.resolveId(message);
        if (!message) throw new TypeError('INVALID_TYPE', 'message', 'MessageResolvable');
    
        await this.client.api.endpoint(`/channels/${this.channel.id}/messages/${message}`, "DELETE", { reason })
      }
    /**
     * @typedef {Object} FetchManyMessagesOptions
     * @property {number} [limit=100] Number of messages to acquire
     * @property {String} [before]	Get messages before this message ID
     * @property {String} [after] Get messages after this message ID
     * @property {String} [around] Get messages around this message ID
     * 
    */
    /**
     * @param {String|FetchManyMessagesOptions} [message] Message id or options
     * @param {BaseFetchOptions} [options]
     * @returns {Promise<Message|Collection<String, Message>>}
    */
      async fetch(message, { cache = true, force = false } = {}) {
        if(typeof message === "string"){
            if (!force) {
                const existing = this.cache.get(message);
                if (existing) return existing;
            }
            
            const data = await this.client.api.endpoint(`/channels/${this.channel.id}/messages/${message}`)
            return this._add(data, { cache });
        } else if(typeof message === "object") {
            const data = await this.client.api.endpoint(`/channels/${this.channel.id}/messages?` + new URLSearchParams(message))
            return new Collection(data.map(m => [m.id, this._add(m, { cache })]))
        } else if(typeof message === "number"){
            return this.fetch({ limit: message })
        } else {
            throw new Error("Invalid option type")
        }
      }
}