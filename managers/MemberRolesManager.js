const Role = require("../structures/Role");
const CachedManager = require("./CachedManager");

module.exports = class MemberRolesManager extends CachedManager {
    constructor(client, member, roles){
        super(client, Role)
        this.member = member
        if(roles){
            for (role in roles) {
                this._add(this.member.guild.roles.get(role), true, {extras: [this.member.guild]})
            }
        }
    }

      get premiumSubscriberRole() {
        return this.cache.find(role => role.tags?.premiumSubscriber) ?? null;
      }
    
      get botRole() {
        if (!this.member.user.bot) return null;
        return this.cache.find(role => role.tags?.botId === this.member.user.id) ?? null;
      }
    async add(role, reason){
        const role = this.resolveId(role)
        return this.client.api.endpoint(`guilds${member.guild.id}/members/${memebr.id}/roles/${role}`, "PUT", { reason })
    }
    async remove(role, reason){
        const role = this.resolveId(role)
        return this.client.api.endpoint(`guilds${member.guild.id}/members/${memebr.id}/roles/${role}`, "DELETE", { reason })
    }
    set(roles, reason){
        return this.member.edit({roles}, reason)
    }
}