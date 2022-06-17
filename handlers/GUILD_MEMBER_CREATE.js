const Member = require("../structures/Member");

module.exports = (client, data) => {
    const guild = client.guild.get(data.guild_id)
    if(guild){
        guild.memberCount++;
        const member = new Member(client, data)
        guild.members.set(data.id, member)
        client.emit('memberCreate', member)
    }
}