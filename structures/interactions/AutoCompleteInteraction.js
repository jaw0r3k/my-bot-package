const { default: fetch } = require("node-fetch");
const Interaction = require("../Interaction");

module.exports = class AutoCompleteInteraction extends Interaction {
    constructor(client, data){
        this.data = data.data
        this.options = data.options
        this.commandName = this.data.name	
    }
    async respond(choices) {
        if (this.responded) throw new Error('INTERACTION_ALREADY_REPLIED');
        await fetch(`${Constants.api}/interactions/${this.id}/${this.token}/callback`,{
          method: "POST",
          body: JSON.stringify({ type: 8, data: { choices } }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        this.responded = true;
    
    }
}
