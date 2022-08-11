const Member = require("../structures/Member");

module.exports = (client, data) => {
    const guild = client.guilds.cache.get(data.guild_id)
    if(guild){
        guild.memberCount++;
        const member = guild.members._add(data)
        client.emit('memberCreate', member)
    }
}