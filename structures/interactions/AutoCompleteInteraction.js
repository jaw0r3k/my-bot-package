const { default: fetch } = require("node-fetch");
const Constants = require("../../src/Constants");
const Interaction = require("../Interaction");

module.exports = class AutoCompleteInteraction extends Interaction {
    constructor(client, data){
        super(client, data)
        this.data = data.data
        this.options = data.options
        this.commandName = this.data.name	
    }
    async respond(choices) {
        if (this.responded) throw new Error('INTERACTION_ALREADY_REPLIED');
        await this.client.api.endpoint(`interactions/${this.id}/${this.token}/callback`, "POST", {
          data: { type: 8, data: { choices } },})
        this.responded = true;
    
    }
}
