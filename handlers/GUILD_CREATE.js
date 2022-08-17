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
        client.emit("guildCreate", guild);
    } else if(client.expectedGuilds.length === client.guilds.cache.size) {
        delete client.expectedGuilds
        client.status = "READY"
        client.emit("ready", client)
    }
  };