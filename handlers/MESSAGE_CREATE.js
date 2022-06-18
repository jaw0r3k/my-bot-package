const Message = require("../structures/Message")

module.exports = (client, data) => {
    const channel = client.channels._cache.get(data.channel_id)
    const message = channel.messages._add(data, { cache: true })
         /**
       * Emitted then a message is created.
       * @event Client#messageCreate
       * @param {Message} message The created message
       */
    client.emit("messageCreate", message)
}