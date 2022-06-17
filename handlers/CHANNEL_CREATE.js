const Guild = require("../structures/Guild");

module.exports = (client, data) => {
    if(!data.guild_id) return
    const guild = client.guilds.get(data.guild_id)
    client.channels._add(channel, guild)
    client.channels.set(data.id, channel)
    /**
         * Emitted whenever the client joins a guild.
         * @event Client#guildCreate
         * @param {Guild} guild The created guild
         */
        client.emit("channelCreate", channel);
  };