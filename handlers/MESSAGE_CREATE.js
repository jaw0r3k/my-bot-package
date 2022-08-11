const Message = require("../structures/Message")

module.exports = (client, data) => {
    const channel = client.channels._cache.get(data.channel_id)
    if(!channel) return
    const message = channel.messages._add(data, { cache: true })
    client.emit("messageCreate", message)
}