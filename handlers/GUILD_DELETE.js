module.exports = (client, data) => {   
    const guild = client.guilds._cache.get(data.id)
    for (const channel of guild.channels) this.client.channels._cache.remove(channel.id);
     /**
         * Emitted when the client leaves guild.
         * @event Client#guildCreate
         * @param {Guild} guild The deleted guild
         */
    client.emit("guildDelete", guild)
    client.guilds._cache.delete(data.id)
}
