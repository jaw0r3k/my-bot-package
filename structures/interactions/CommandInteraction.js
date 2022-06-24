const Interaction = require("../Interaction");
const InteractionOptionsResolver = require("./InteractionOptionsResolver");
const InteractionResponses = require("./InteractionResponses");

class Commandnteraction extends Interaction {
    constructor(client, data){
        super(client, data)
        this.data = data.data
        console.log(this.data)
        this.options = new InteractionOptionsResolver(this.client, data.data.options)
        this.commandName = this.data.name	
    }
}
InteractionResponses.applyToClass(Commandnteraction, ["deferUpdate", "update"])
module.exports = Commandnteraction