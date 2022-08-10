const Interaction = require("../Interaction");
const InteractionOptionsResolver = require("./InteractionOptionsResolver");
const InteractionResponses = require("./InteractionResponses");

class Commandnteraction extends Interaction {
    constructor(client, data){
        super(client, data)
        this.data = data.data
        this.options = new InteractionOptionsResolver(this.client, data.data.options, data.data.resolved)
        this.commandName = this.data.name	
    }
}
InteractionResponses.applyToClass(Commandnteraction, ["deferUpdate", "update"])
module.exports = Commandnteraction