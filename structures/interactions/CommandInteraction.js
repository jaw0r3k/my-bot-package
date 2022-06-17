const Interaction = require("../Interaction");

class Commandnteraction extends Interaction {
    constructor(client, data){
        super(client, data)
        this.data = data.data
        this.options = data.options
        this.commandName = this.data.name	
    }
}
InteractionResponses.applyToClass(Commandnteraction, ["deferUpdate", "update"])
module.exports = Commandnteraction