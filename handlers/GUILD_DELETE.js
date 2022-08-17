module.exports = (client, data) => {   
    const guild = client.guilds.cache.get(data.id)
    for (const channel of guild.channels) this.client.channels.cache.delete(channel.id);
    client.emit("guildDelete", guild)
    client.guilds.cache.delete(data.id)
}
