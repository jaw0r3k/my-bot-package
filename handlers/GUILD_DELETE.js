module.exports = (client, data) => {   
    const guild = client.guilds.get(data.id)
    for (const channel of guild.channels) this.client.channels.remove(channel.id);
     /**
         * Emitted when the client leaves guild.
         * @event Client#guildCreate
         * @param {Guild} guild The deleted guild
         */
    client.emit("guildDelete", guild)
    client.guilds.delete(data.id)
}
