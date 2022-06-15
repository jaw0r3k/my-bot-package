const User = require("../structures/User");

module.exports = (client, data) => {
    client.user = new User(client, data.user);
    console.log(data.guilds)
    client.expectedGuilds = data.guilds
    setTimeout(() => {
        if(client.status !== "READY"){
        client.status = "READY"
        client.emit("ready", client)
        }
    }, (client.intents & 1) === 1 ? client.guildWitTimeout ?? 15000 : 0)
}