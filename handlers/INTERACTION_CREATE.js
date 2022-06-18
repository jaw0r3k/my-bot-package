const Interaction = require("../structures/Interaction")

module.exports = (client, data) => {
    const interaction = Interaction.createInteraction(client, data)
    client.emit('interactionCreate', interaction)
}