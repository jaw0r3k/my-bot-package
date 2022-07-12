const Interaction = require("../Interaction");
const Message = require("../Message");
const InteractionResponses = require("./InteractionResponses");

class MessageInteraction extends Interaction {
    constructor(client, data){
        super(client, data)
        this.data = data.data
        this.options = data.options
        this.targetId = data.data.target_id;
        this.commandName = this.data.name	
    }
    get message(){
        return new Message(Object.entries(this.options.messages)[0][1])
    }
}
InteractionResponses.applyToClass(ButtonInteraction, ["deferUpdate", "update"])
module.exports = MessageInteraction