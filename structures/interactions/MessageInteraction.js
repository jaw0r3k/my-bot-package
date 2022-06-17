const Interaction = require("../Interaction");
const Message = require("../Message");

class MessageInteraction extends Interaction {
    constructor(client, data){
        super(client, data)
        this.data = data.data
        this.options = data.options
        this.targetId = data.data.target_id;
        this.commandName = this.data.name	
        InteractionResponses.applyToClass(ButtonInteraction, ["deferUpdate", "update"])
    }
    get message(){
        return new Message(Object.entries(this.options.messages)[0][1])
    }
}
module.exports = MessageInteraction