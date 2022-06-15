const Message = require("../structures/Message")

module.exports = (client, data) => {
    console.log(data)
    const guild = client.guilds.get(data.guild_id)
    if(guild.members.get(data.member.id)) guild.members.set(data.member.id, data.member)
    const message = new Message(client, data)
    message.channel.messages.set(message.id, message)
         /**
       * Emitted then a message is created.
       * @event Client#messageCreate
       * @param {Message} message The created message
       */
    client.emit("messageCreate", message)
}