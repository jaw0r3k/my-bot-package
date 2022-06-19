const Base = require("./Base")

module.exports = class Role extends Base {
    constructor(client, data, guild){
        super(client)
        this.guild = guild
        this.id = data.id
    }
    _patch(data){
        this.name = data.name
        this.color = data.color
        this.hoist = data.hoist
        this.mentionable = data.mentionable
        this.position = data.position
        this.permissions = data.permissions
        this.icon = data.icon ?? null
        this.tags = data.tags ?? {}
        this.unicodeEmoji = data.unicode_emoji ?? null
    }
    async setPosition(position, reason){
        this.guild.roles.modifyPositions(this, position, reason)
    }
}