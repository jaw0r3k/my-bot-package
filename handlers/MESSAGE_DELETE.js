const Message = require("../structures/Message")

module.exports = (client, data) => {
    const channel = client.channels._cache.get(data.channel_id)
    const message = channel.messages._cache.get(data.id)
        /**
       * Emitted then a message is created.
       * @event Client#messageCreate
       * @param {Message} message The created message
       */
    client.emit("messageDelete", message)
    if(message){
        channel.messages._cache.delete(data.id)
    }
}