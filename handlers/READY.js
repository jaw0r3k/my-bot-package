const ClientUser = require("../structures/ClientUser");

module.exports = (client, data) => {
    client.application = data.application
    client.user = new ClientUser(client, data.user);
    client.ws.resumeGatewayUrl = data.resume_gateway_url;
    console.log(client.ws.resumeGatewayUrl)
    client.ws.sessionId = data.session_id;
    client.ws.sessionType = data.session_type
    client.expectedGuilds = data.guilds
    setTimeout(() => {
        if(client.status !== "READY"){
        client.status = "READY"
        client.emit("ready", client)
        }
    }, (client.intents & 1) === 1 ? client.waitTimeout ?? 15000 : 0)
}