const Role = require("../structures/User")

module.exports = (client, data) => {
    const guild = client.guilds.cache.get(data.guild_id)
    if(guild){
        const role = guild.roles.cache.get(data.role_id)
        if(role) client.emit('roleDelete', role)
        guild.roles.cache.delete(data.role_id)
    }
}



