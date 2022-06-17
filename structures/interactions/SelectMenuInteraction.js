const Interaction = require("../Interaction");
const Message = require("../Message");

class SelectMenuInteraction extends Interaction {
    constructor(client, data){
        super(client, data)
            this.data = data.data
            this.options = data.options
            this.customId = data.data.custom_id	
            this.values = data.data.values
            this.componentType = data.data.component_type
            this.message = data.message ? new Message(client, data.message) : null
            InteractionResponses.applyToClass(SelectMenuInteraction, [])
    }
}
module.exports = SelectMenuInteraction