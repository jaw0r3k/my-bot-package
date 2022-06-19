const Base = require("./Base")

module.exports = class Ban extends Base {
    constructor(client, ban, guild){
        super(client)
        this.guild = guild
        this.user = this.client.users._add(ban.user)
        this.reason = data.reason ?? null
    }
}