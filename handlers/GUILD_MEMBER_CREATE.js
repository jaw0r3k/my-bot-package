const Member = require("../structures/Member");

module.exports = (client, data) => {
    const guild = client.guild.get(data.guild_id)
    if(guild){
        guild.memberCount++;
        const member = guild.members._add(data)
        client.emit('memberCreate', member)
    }
}