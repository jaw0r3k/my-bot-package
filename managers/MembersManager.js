const { Collection } = require("../structures/Collection")
const { default: fetch } = require("node-fetch")
const Constants = require("../src/Constants")
const Member = require("../structures/Member")
const Role = require("../structures/Role")
const CachedManager = require("./CachedManager")

module.exports = class MembersManager extends CachedManager {
    constructor(client, guild, members){
       super(client, Member)
       this.guild = guild
       if (members) {
        for (const member of members) {
          this._add(member);
        }
      }
      }
      _add(data, { cache = true } = {}) {
        const existing = this._cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          return existing;
        }
    
        const member = new Member(this.client, data, this.guild)
    
        if (!member) {
          return null;
        }
    
        if (cache) this._cache.set(member.id, member);
    
        return member;
      }
       // TODO: Add prune, list, search, and it obvius memberChunkUpdate
      async edit(member, data, reason){
        member = this.resolve(member)
        data.roles &&= data.roles.map(role => (role instanceof Role ? role.id : role));

        data.communication_disabled_until =
        data.communicationDisabledUntil && new Date(data.communicationDisabledUntil).toISOString();
        member = await this.client.api.endpoint(`/guilds/${this.guild.id}/members/${member.id}`, "PATCH", { data, reason})
        this._add(member)
      }
      async ban(member, reason){
        member = this.resolveId(member)
        await this.guild.bans.create(id, reason)
      }
      async unban(member, reason){
        member = this.resolveId(member)
        await this.guild.bans.remove(id, reason)
      }
      async kick(member, reason){
        member = this.resolveId(member)
        await this.client.api.endpoint(`guilds/${this.guild.id}/members/${member}`, "DELETE", { reason })
      }
      async fetch(memberOrOptions, { cache= true, force = false} = {}) {
        const member = this.resolveId(memberOrOptions)
        if(member){

          if (!force) {
            const existing = this.cache.get(member);
            if (existing) return existing;
          }
          
          const data = await this.client.api.endpoint(`guilds/${this.guild.id}/members/${member}`)
          return this._add(data, { cache });
        } else {
          const data = await this.client.api.endpoint(`guilds/${this.guild.id}/members`) // TODO: Fix it
          return new Collection(data.map(m => [m.user.id, this._add(m, { cache: memberOrOptions.cache})]))
        }
        }
      me(){
        return this.cache.get(this.client.user.id)
      }
}