const Channel = require("../structures/Channel");
const CachedManager = require("./CachedManager");

module.exports = class ChannelsManager extends CachedManager {
    constructor(client){
       super(client, Channel)

    }
    _add(data, guild, { cache = true } = {}) {
        const existing = this.cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          guild?.channels?._add(existing);
          return existing;
        }
        
        const channel = Channel.generateChannel(this.client, data);
    
        if (!channel) {
          return null;
        }
    
        if (cache) this.cache.set(channel.id, channel);
    
        return channel;
      }
    /**
   * @typedef {Object} BaseFetchOptions
   * @property {boolean} [cache=true] Whether to cache the fetched data if it wasn't already
   * @property {boolean} [force=false] Whether to skip the cache check and request the API
   */
    /**
     * 
     * @param {String} id 
     * @param {BaseFetchOptions} options 
     * @returns 
     */
      async fetch(id, { cache = true, force = false } = {}) {
        if (!force) {
          const existing = this.cache.get(id);
          if (existing) return existing;
        }
    
        const data = await this.client.api.endpoint(`channels/${id}`)
        return this._add(data, this.client.guilds._cache.get(data.guild_id) ?? null, { cache });
      }
}