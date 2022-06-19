const Channel = require("../structures/Channel");
const User = require("../structures/User");
const CachedManager = require("./CachedManager");

module.exports = class UsersManager extends CachedManager {
    constructor(client){
       super(client, User)

    }
    _add(data, { cache = true } = {}) {
        const existing = this.cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          return existing;
        }
        
        const user = new User(this.client, data);
    
        if (!user) {
          return null;
        }
    
        if (cache) this.cache.set(channel.id, channel);
    
        return user;
      }
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
    
        const data = await this.client.api.endpoint(`users/${id}`)
        return this._add(data, { cache });
      }
}