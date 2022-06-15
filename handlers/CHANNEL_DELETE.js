const BaseTextChannel = require("../structures/BaseTextChannel");
const Channel = require("../structures/Channel");
const Guild = require("../structures/Guild");

module.exports = (client, data) => {
    if(!data.guild_id) return
    const guild = client.guilds.get(data.guild_id)
    const channel = guild.channels.get(data.id)
    guild.channels.delete(data.id)
    client.channels.delete(data.id)
    /**
     * Emitted when channel is ccreated.
     * @event Client#channelDelete
     * @param {Channel} channel Created channel
    */
    client.emit("channelDelete", channel);
  };