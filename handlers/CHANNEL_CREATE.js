const BaseTextChannel = require("../structures/BaseTextChannel");
const Channel = require("../structures/Channel");
const Guild = require("../structures/Guild");

module.exports = (client, data) => {
    if(!data.guild_id) return
    const guild = client.guilds.get(data.guild_id)
    const channel = new BaseTextChannel(client, data)
    guild.channels.set(data.id, channel)
    client.channels.set(data.id, channel)
    /**
         * Emitted whenever the client joins a guild.
         * @event Client#guildCreate
         * @param {Guild} guild The created guild
         */
        client.emit("channelCreate", channel);
  };