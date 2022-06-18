const { default: fetch } = require("node-fetch")
const Constants = require("../src/Constants")
const Member = require("../structures/Member")
const CachedManager = require("./CachedManager")

module.exports = class MembersManager extends CachedManager {
    constructor(client, guild, members){
       super(client, Member, members)
       this.guild = guild
    }
    _add(data, guild, { cache = true } = {}) {
        const existing = this._cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          // guild?.channels?._add(existing);
          return existing;
        }
    
        const member = new Member(this.client, data, this.guild)
    
        if (!member) {
          return null;
        }
    
        if (cache) this._cache.set(member.id, member);
    
        return member;
      }
      async fetch(id, { cache = true, force = false } = {}) {
        if (!force) {
          const existing = this.cache.get(id);
          if (existing) return existing;
        }
    
        const data = await fetch(`${Constants.api}/guilds/${this.guild.id}/members/${id}`,{
          method: "GET",
          headers: {
            "Authorization": `Bot ${this.client.token}`,
            "Content-Type": "application/json"
          }
        })
        return this._add(data, null, { cache });
      }
}