module.exports = (client, data) => {
    const guild = client.guild.get(data.guild_id)
    if(guild){
        guild.memberCount++;
        guild.members.set(data.id, data)
        client.emit('memberCreate', data)
    }
}