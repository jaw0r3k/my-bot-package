const User = require("../structures/User")

module.exports = (client, data) => {
    const guild = client.guild.get(data.guild_id)
    if(guild){
        guild.memberCount--;
        const member = guild.members._cache.get(data.user.id)
        client.emit('memberRemove', member ?? new User(client, data.user))
        guild.members._cache.delete(data.id)
    }
}