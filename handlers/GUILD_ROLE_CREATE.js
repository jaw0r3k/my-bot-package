const Role = require("../structures/User")

module.exports = (client, data) => {
    const guild = client.guilds.cache.get(data.guild_id)
    if(guild){
        const role = guild.roles._add(data.role)
        client.emit('roleCreate', role)
    }
}



