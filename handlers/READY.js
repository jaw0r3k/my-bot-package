const ClientUser = require("../structures/ClientUser");

module.exports = (client, data) => {
    client.application = data.application
    client.user = new ClientUser(client, data.user);
    client.expectedGuilds = data.guilds
    setTimeout(() => {
        if(client.status !== "READY"){
        client.status = "READY"
        client.emit("ready", client)
        }
    }, (client.intents & 1) === 1 ? client.waitTimeout ?? 15000 : 0)
}