const Interaction = require("../Interaction");
const Message = require("../Message");
const InteractionResponses = require("./InteractionResponses");
class ButtonInteraction extends Interaction {
    constructor(client, data){
        super(client, data)
        this.data = data.data
        this.options = data.options
        this.customId = this.data.custom_id	
        this.componentType = data.data.component_type
        this.message = data.message ? new Message(client, data.message) : null
        InteractionResponses.applyToClass(ButtonInteraction, [])
    }
}
module.exports = ButtonInteraction