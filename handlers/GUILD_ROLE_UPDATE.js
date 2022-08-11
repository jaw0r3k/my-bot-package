const Role = require("../structures/User")

module.exports = (client, data) => {
    const guild = client.guilds.cache.get(data.guild_id)
    if(guild){
        const oldRole = guild.roles.cache.get(data.role)
        const newRole = guild.roles._add(data.role)
        client.emit('roleUpdate', oldRole, newRole)
    }
}



