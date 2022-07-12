const BaseTextChannel = require("../structures/BaseTextChannel");
const Channel = require("../structures/Channel");
const Guild = require("../structures/Guild");

module.exports = (client, data) => {
    const guild = new Guild(client, data)
    client.guilds.cache.set(data.id, guild);
    for(const channel of data.channels) {
        client.channels._add(channel, guild)
    }
    if (client.status === "READY") {
        /**
         * Emitted whenever the client joins a guild.
         * @event Client#guildCreate
         * @param {Guild} guild The created guild
         */
        client.emit("guildCreate", guild);
    } else if(client.expectedGuilds.length === client.guilds._cache.size) {
        delete client.expectedGuilds
        client.status = "READY"
        client.emit("ready", client)
    }
  };