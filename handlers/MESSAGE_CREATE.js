const Member = require("../structures/Member")
const Message = require("../structures/Message")

module.exports = (client, data) => {
    const message = new Message(client, data)
    message.channel.messages.set(message.id, message)
         /**
       * Emitted then a message is created.
       * @event Client#messageCreate
       * @param {Message} message The created message
       */
    client.emit("messageCreate", message)
}