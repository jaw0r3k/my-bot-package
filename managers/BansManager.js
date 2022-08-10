const Ban = require("../structures/Ban");
const Collection = require("../structures/Collection");
const CachedManager = require("./CachedManager");

module.exports = class BansManager extends CachedManager {
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
        
        const ban = new Ban(this.client, data, this.guild);
    
        if (!ban) {
          return null;
        }
    
        if (cache) this.cache.set(ban.id, ban);
    
        return ban;
      }
    /**
     * 
     * @param {String} id 
     * @param {BaseFetchOptions} options 
     * @returns 
     */
      async create(user, reason){
        user = this.client.users.resolveId(user)
        if(!user) throw new Error("INVALID_TYPE", "user", "UserResolvable")
        await this.client.api.endpoint(`guilds/${this.guild.id}/bans/${user}`, "PUT", { reason })
      }    
      async remove(user, reason){
        user = this.client.users.resolveId(user)
        if(!user) throw new Error("INVALID_TYPE", "user", "UserResolvable")
        await this.client.api.endpoint(`guilds/${this.guild.id}/bans/${user}`, "DELETE", { reason })
      }
      async fetch(userOrOptions, {cache = true, force = false} = {}) {
        if(typeof userOrOptions === "undefined") return this._fetchMany()
        const user = this.client.users.resolveId(userOrOptions)
        if(user){

          if (!force) {
            const existing = this.cache.get(user);
            if (existing) return existing;
          }
          
          const data = await this.client.api.endpoint(`guilds/${guild.id}/bans/${user}`)
          return this._add(data, { cache });
        } else {
          if(!userOrOptions.before && !userOrOptions.after && !userOrOptions.limit && typeof userOrOptions.cache === 'undefined') {
            return Promise.reject(new Error('FETCH_BAN_RESOLVE_ID'));
          }
          return this._fetchMany(userOrOptions)
        }
      }
     async _fetchMany(options={}){
        const data = await this.client.api.endpoint(`guilds/${this.guild.id}/bans?` + new URLSearchParams(options))
        return new Collection(data.map(b => [b.user.id, this._add(b, { cache: options.cache })]))
      }
}