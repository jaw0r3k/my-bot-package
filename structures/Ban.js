const Base = require("./Base")

module.exports = class Ban extends Base {
    constructor(client, data, guild){
        super(client)
        this.guild = guild
        this.user = this.client.users._add(data.user)
        this.reason = data.reason ?? null
    }
}