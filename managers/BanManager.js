const Ban = require("../structures/Ban");
const CachedManager = require("./CachedManager");

module.exports = class ChannelsManager extends CachedManager {
    constructor(client, guild, bans){
       super(client, Ban, bans)
        this.guild = guild
    }
    _add(data, { cache = true } = {}) {
        const existing = this.cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          return existing;
        }
        
        const ban = new Ban(this.client, data. this.guild);
    
        if (!ban) {
          return null;
        }
    
        if (cache) this.cache.set(ban.id, ban);
    
        return ban;
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
      async create(id, reason){
        id = this.guild.members.resolveId(id)
        await this.client.api.endpoint(`guild/${this.guild.id}/bans/${id}`, "PUT", { reason })
      }    
      async remove(id, reason){
        id = this.guild.members.resolveId(id)
        await this.client.api.endpoint(`guild/${this.guild.id}/bans/${id}`, "DELETE", { reason })
      }
      async fetch(id, { cache = true, force = false } = {}) {
        if (!force) {
          const existing = this.cache.get(id);
          if (existing) return existing;
        }
    
        const data = await this.client.api.endpoint(`guild/${guild.id}/bans/${id}`)
        return this._add(data, { cache });
      }
}