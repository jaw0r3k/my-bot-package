const BaseTextChannel = require("../structures/BaseTextChannel");
const Channel = require("../structures/Channel");
const Guild = require("../structures/Guild");

module.exports = (client, data) => {
    if(!data.guild_id) return
    const guild = client.guilds.cache.get(data.guild_id)
    const channel = guild.channels.cache.get(data.id)
    client.emit("channelDelete", channel);
    guild.channels.cache.delete(data.id)
    client.channels.cache.delete(data.id)
  };