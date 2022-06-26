const Role = require("../structures/Role");
const CachedManager = require("./CachedManager");

module.exports = class MemberRolesManager extends CachedManager {
    constructor(client, member, roles){
        super(client, Role)
        this.member = member
        if(roles){
            this._roles = roles
     }
    }
    get cache(){
        this.member.guild.roles.cache.filter(r => this._roles.includes(r.id))
    }
      get premiumSubscriberRole() {
        return this.cache.find(role => role.tags?.premiumSubscriber) ?? null;
      }
    
      get botRole() {
        if (!this.member.user.bot) return null;
        return this.cache.find(role => role.tags?.botId === this.member.user.id) ?? null;
      }
    async add(role, reason){
        role = this.resolveId(role)
        return this.client.api.endpoint(`guilds${member.guild.id}/members/${memebr.id}/roles/${role}`, "PUT", { reason })
    }
    async remove(role, reason){
        role = this.resolveId(role)
        return this.client.api.endpoint(`guilds${member.guild.id}/members/${memebr.id}/roles/${role}`, "DELETE", { reason })
    }
    set(roles, reason){
        return this.member.edit({roles}, reason)
    }
}