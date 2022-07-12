const Member = require("../structures/Member");
const User = require("../structures/User");
const CachedManager = require("./CachedManager");

module.exports = class UsersManager extends CachedManager {
    constructor(client){
       super(client, User)

    }
      
    resolve(idOrInstance) {
      if (idOrInstance instanceof this.holds) return idOrInstance;
      if(idOrInstance instanceof Member) return this.cache.get(idOrInstance.id) ?? null;
      if (typeof idOrInstance === 'string') return this.cache.get(idOrInstance) ?? null;
      return null;
    }
    resolveId(idOrInstance) {
      if (idOrInstance instanceof this.holds || idOrInstance instanceof Member) return idOrInstance.id;
      if (typeof idOrInstance === 'string') return idOrInstance
      return null;
    }
    /**
     * 
     * @param {String} id 
     * @param {BaseFetchOptions} options 
     * @returns 
     */
      async fetch(id, { cache = true, force = false } = {}) {
        id = this.resolve(id)
        if (!force) {
          const existing = this.cache.get(id);
          if (existing) return existing;
        }
    
        const data = await this.client.api.endpoint(`users/${id}`)
        return this._add(data, { cache }); 
      }
}