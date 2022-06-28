const Role = require("../structures/Role")
const CachedManager = require("./CachedManager")
const Permissions = require("../utils/Permissions")
module.exports = class RolesManager extends CachedManager {
    constructor(client, guild, roles){
        super(client, Role)
        this.guild = guild
        if (roles) {
            for (const role of roles) {
              this._add(role);
            }
          }
    }
    _add(data, { cache = true } = {}) {
        const existing = this._cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          return existing;
        }
    
        const role = new Role(this.client, data, this.guild)
    
        if (!role) {
          return null;
        }
    
        if (cache) this._cache.set(role.id, role);
    
        return role;
    }
    async create(options, reason) {
        let { name, color, hoist, permissions, position, mentionable, icon, unicodeEmoji } = options;
        permissions = new Permissions(permissions).bitfield
        const data = await this.client.api.endpoint(`guilds/${this.guild.id}/roles`, "POST", {
            name,
            color,
            hoist,
            permissions,
            mentionable,
            icon,
            unicode_emoji: unicodeEmoji,
            reason,
        });
        const role = this._add(data)
        return role;
    }
    async delete(role, reason){
        role = this.resolveId(role)
        if (!role) throw new TypeError('INVALID_TYPE', 'role', 'RoleResolvable');
        this.client.api.endpoint(`guilds/${this.guild.id}/roles/${role}`, "DELETE", { reason })
    }
    async modifyPositions(role, position, reason) {
      role = this.resolveId(role)
      if (!role) throw new TypeError('INVALID_TYPE', 'role', 'RoleResolvable');
      if(typeof position !== "number") throw new Error("INVALID_TYPE", "position", "number") 
      this.client.api.endpoint(`guilds/${this.guild.id}/roles/`, "PATCH", { data: { id: id, position, reason }})
    }
}