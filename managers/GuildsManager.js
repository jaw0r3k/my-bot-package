const Guild = require("../structures/Guild");
const CachedManager = require("./CachedManager");

module.exports = class GuildsManager extends CachedManager {
    constructor(client){
       super(client, Guild)

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
    
        const data = await this.client.api.endpoint(`guilds/${id}`)
        return this._add(data, { cache });
      }
}