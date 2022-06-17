const Channel = require("../structures/Channel")
const DataManager = require("./DataManager")

module.exports = class ChannelsManager extends DataManager {
    constructor(client){
       super(client, Channel, [])

    }
    _add(data, guild, { cache = true } = {}) {
        const existing = this._cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          // guild?.channels?._add(existing);
          return existing;
        }
    
        const channel = Channel.generateChannel(this.client, data);
    
        if (!channel) {
          return null;
        }
    
        if (cache) this._cache.set(channel.id, channel);
    
        return channel;
      }
      async fetch(id, { cache = true, force = false } = {}) {
        if (!force) {
          const existing = this.cache.get(id);
          if (existing) return existing;
        }
    
        const data = await fetch(`${Constants.api}/channels/${id}`,{
          method: "GET",
          headers: {
            "Authorization": `Bot ${this.client.token}`,
            "Content-Type": "application/json"
          }
        })
        return this._add(data, null, { cache });
      }
}