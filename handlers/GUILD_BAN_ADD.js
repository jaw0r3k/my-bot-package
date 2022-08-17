module.exports = (client, data) => {
    const guild = client.guilds.cache.get(data.guild_id)
    if(guild){
        const ban = guild.bans._add(data)
        client.emit("banAdd", ban)
    }
}