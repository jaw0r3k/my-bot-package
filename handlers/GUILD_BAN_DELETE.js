module.exports = (client, data) => {
    const guild = client.guilds.cache.get(data.guild_id)
    if(guild){
        const ban = guild.bans.cache._add(data.user.id, false)
        client.emit("banDelete", ban)
        if(ban) guild.bans.cache.delete(data.user.id)
    }
}